import {
  backblazeConnect,
  uploadImage,
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

    const results = await uploadImage(req.headers["dog-id"], image);

    if (results.success) {
      return res.status(200).send({
        success: true,
        message: "Image successfully uploaded",
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
