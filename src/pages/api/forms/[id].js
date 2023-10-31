import { Types } from "mongoose";
import { getFormById } from "../../../../server/db/actions/Form";

export default async function handler(req, res) {
  if (req.method == "GET") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to get form because form id is not in valid format",
      });
    }

    try {
      const data = await getFormById(req.query.id);

      if (!data) {
        return res.status(404).send({
          success: false,
          error: "Unable to retrieve dog because it doesn't exist",
        });
      }

      return res.status(200).send({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.status(500).send({ success: false, error: error.message });
    }
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
