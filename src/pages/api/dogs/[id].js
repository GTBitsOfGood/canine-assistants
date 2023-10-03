import mongoose from "mongoose";
import {
  deleteDog,
  updateDog,
  getDogById,
} from "../../../../server/db/actions/Dog";
import { dogSchema } from "@/utils/consts";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      const data = await getDogById(id);

      if (data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Unable to retrieve dog because it doesn't exist",
        });
        return;
      }

      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
  } else if (req.method == "DELETE") {
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
  } else if (req.method == "PATCH") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because dog ID is not in valid format.",
      });
    }
    const { success, error, data } = dogSchema
      .partial()
      .strict()
      .safeParse(req.body);

    if (!success) {
      const code = error.errors[0].code;
      if (code == "invalid_type") {
        return res.status(422).send({
          success: false,
          message:
            "For field " +
            error.errors[0].path +
            " expected type " +
            error.errors[0].expected +
            ", but received " +
            error.errors[0].received,
        });
      } else {
        console.log(error);
        return res.status(422).send({
          success: false,
          message: error.errors[0].message,
        });
      }
    }

    return updateDog(req.query.id, data)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot update dog because dog does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Dog sucessfully updated!",
            data: results,
          });
        }
      })
      .catch((e) => {
        return res.status(500).send({
          success: false,
          message: e.message,
        });
      });
  }
  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
