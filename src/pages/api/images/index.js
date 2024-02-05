import { getDogById, updateDog } from "../../../../server/db/actions/Dog";
import {
  backblazeConnect,
  uploadImage,
  deleteImage,
} from "../../../../server/db/actions/Image";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const results = await backblazeConnect();

    if (results.success) {
      return res.status(200).send({
        success: true,
        message: "Backblaze successfully connected",
        data: results.data,
      });
    } else {
      return res.status(400).send({
        success: false,
        data: results.error,
      });
    }
  } else if (req.method === "POST") {
    const dogId = req.headers["dog-id"];

    const dog = await getDogById(dogId).catch(() => {
      return false;
    });

    if (!dog) {
      return res.status(404).send({
        success: false,
        message: "Dog ID does not exist",
      });
    }

    // Delete previous image if it exist
    if (dog.image && dog.image != "") {
      const res = await deleteImage(dogId, dog.image).catch(() => {
        return false;
      });

      if (!res || !res.success) {
        return res.status(500).send({
          success: false,
          message:
            "There was a problem deleting the existing image, please reupload the new image and try again",
        });
      }
    }

    // Create file buffer from requst stream
    const image = await new Promise((resolve) => {
      const chunks = [];

      req.on("data", (chunk) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    const results = await uploadImage(dogId, image);

    const updateResults = await updateDog(dogId, {
      image: `https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${results.data.fileId}`,
    }).catch(() => {
      return "err";
    });

    if (updateResults == "err") {
      return res.status(404).send({
        success: false,
        message: "There was a problem updating the dog's image URL",
      });
    }

    if (results.success) {
      return res.status(200).send({
        success: true,
        data: results.data,
      });
    } else {
      return res.status(400).send({
        success: false,
        data: results.error,
      });
    }
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}

// Request body is not parsed so it is received as a stream
export const config = {
  api: {
    bodyParser: false,
  },
};
