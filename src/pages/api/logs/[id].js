import mongoose from "mongoose";
import { deleteLog } from "../../../../server/db/actions/Log";

export default async function handler(req, res) {
  if (req.method == "DELETE") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because log id is not in valid format",
      });
    }

    return deleteLog(req.query.id)
      .then((id) => {
        return res.status(200).send({
          success: true,
          message: "Successfully deleted log",
          data: { _id: id },
        });
      })
      .catch((error) => {
        if (
          error.message ==
          "TypeError: Cannot read properties of null (reading 'dog')"
        ) {
          return res.status(404).send({
            success: false,
            message: "Cannot delete log because log id does not exist",
          });
        }

        return res.status(500).send({
          success: false,
          message: "Cannot delete log at this time, please try again",
          error: error.message,
        });
      });
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
