import { Types } from "mongoose";
import {
  updateForm,
  deleteForm,
  getFormById,
} from "../../../../server/db/actions/Form";
import { formUpdateSchema } from "@/utils/consts";
import { checkIsAuthorized } from "../../../../server/middleware/checkIsAuthorized";

export default async function handler(req, res) {
  if (req.method == "PUT") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because form ID is not in valid format.",
      });
    }

    const { success, error, data } = formUpdateSchema
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
        let message = error.errors[0].code;

        return res.status(422).send({
          success: false,
          message: message,
        });
      }
    }

    const form = await getFormById(req.query.id);
    const session = await checkIsAuthorized(req, res, {
      form,
      checkIsAuthorized: true,
    });
    if (!session) return;

    updatedFormObject = await updateForm(req.query.id, data);

    if (!updatedFormObject) {
      return res.status(404).json({
        success: false,
        message: "Cannot update form because form does not exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Sucessfully updated form",
        data: updatedFormObject,
      });
    }
  }

  if (req.method == "DELETE") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because form ID is not in valid format.",
      });
    }

    const form = await getFormById(req.query.id);
    const session = await checkIsAuthorized(req, res, {
      form,
      checkIsAuthorized: true,
    });
    if (!session) return;

    return deleteForm(req.query.id)
      .then((results) => {
        return res.status(200).send({
          success: true,
          message: "Form sucessfully deleted",
          data: results._id,
        });
      })
      .catch((error) => {
        if (error.message == "Invalid form ID") {
          return res.status(500).send({
            success: false,
            message: "Unable to delete form because form ID does not exist",
          });
        }

        return res.status(500).send({
          success: false,
          message: "Unable to delete form, please try again",
        });
      });
  }

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
      const session = await checkIsAuthorized(req, res, {
        dog: data.dog,
        form: data,
        checkInstructors: true,
        checkCaregivers: true,
        checkUserAuthored: true,
      });
      if (!session) return;

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
