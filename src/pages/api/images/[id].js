import { getDogById } from "../../../../server/db/actions/Dog";
import { deleteImage } from "../../../../server/db/actions/Image";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const dog = await getDogById(req.query.id).catch(() => {
      return false;
    });

    if (!dog) {
      return res.status(404).send({
        success: false,
        message: "Cannot delete images for a dog ID that does not exist",
      });
    }

    if (dog.image && dog.image != "") {
      const deleteRes = await deleteImage(req.query.id, dog.image).catch(() => {
        return false;
      });

      if (!deleteRes || !deleteRes.success) {
        return res.status(500).send({
          success: false,
          message:
            "There was a problem deleting the existing image, please delete manually or replace image",
        });
      }
    }

    return res.status(200).send({
      success: true,
      message: "Successfully deleted image",
    });
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
