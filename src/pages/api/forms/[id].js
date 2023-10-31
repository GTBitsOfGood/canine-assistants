import { Types } from "mongoose";
import { updateForm, deleteForm } from "../../../../server/db/actions/Form";
import { formUpdateSchema } from "@/utils/consts";

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

    let updatedFormObject;
    // TODO: grab user from session
    const user = {
      role: "Admin",
    };

    try {
      if (user.role == "Admin") {
        updatedFormObject = await updateForm(req.query.id, data);
      } else {
        // TODO: check if the user _id from session == user _id of the form they are trying to update
        updatedFormObject = await updateForm(req.query.id, data);
      }
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: e.message,
      });
    }

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

    return deleteForm(req.query.id)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot delete form because form does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Form sucessfully deleted",
            data: results._id,
          });
        }
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
          error: error.message,
        });
      });
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
