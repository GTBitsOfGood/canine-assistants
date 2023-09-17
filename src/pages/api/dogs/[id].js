import mongoose from "mongoose";
import { deleteDog } from "../../../../server/db/actions/Dog";

export default function handler(req, res) {
  if (req.method == "DELETE") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because dog id is not in valid format",
      });
    }

    return deleteDog(req.query.id)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot delete dog because dog does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Dog sucessfully deleted",
            data: results._id,
          });
        }
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: "Unable to delete dog, please try again",
        });
      });
  }
}
