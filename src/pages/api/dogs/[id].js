import { Types } from "mongoose";
import {
  deleteDog,
  updateDog,
  getDogById,
} from "../../../../server/db/actions/Dog";
import { dogSchema } from "@/utils/consts";
import { checkIsAuthorized } from "../../../../server/middleware/checkIsAuthorized";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      const data = await getDogById(id);

      if (data === null) {
        res.status(404).json({
          success: false,
          error: "Unable to retrieve dog because it doesn't exist",
        });
        return;
      }

      session = await checkIsAuthorized(req, res, {
        dog: data,
        checkInstructors: true,
        checkVolunteer: true,
        checkCaregivers: true,
        checkPartner: true,
      });

      if (!session) return;

      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
  } else if (req.method == "DELETE") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because dog id is not in valid format",
      });
    }

    console.log("here");
    const dog = await getDogById(req.query.id);

    if (dog === null) {
      res.status(404).json({
        success: false,
        error: "Unable to retrieve dog because it doesn't exist",
      });
      return;
    }

    session = await checkIsAuthorized(req, res);
    if (!session) return;

    return deleteDog(req.query.id)
      .then((results) => {
        return res.status(200).send({
          success: true,
          message: "Dog sucessfully deleted",
          data: results._id,
        });
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: "Unable to delete dog, please try again",
        });
      });
  } else if (req.method == "PATCH") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because dog ID is not in valid format.",
      });
    }

    const { success, error, data } = dogSchema
      .partial()
      .strict()
      .safeParse(req.body);

    const dog = await getDogById(req.query.id);

    if (dog === null) {
      res.status(404).json({
        success: false,
        error: "Unable to retrieve dog because it doesn't exist",
      });
      return;
    }

    session = await checkIsAuthorized(req, res, {
      dog,
      checkInstructors: true,
      checkCaregivers: true,
    });
    if (!session) return;

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
        return res.status(422).send({
          success: false,
          message: error.errors[0].message,
        });
      }
    }

    return updateDog(req.query.id, data)
      .then((results) => {
        return res.status(200).send({
          success: true,
          message: "Dog sucessfully updated!",
          data: results,
        });
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
