import { Types } from "mongoose";
import { userUpdateSchema } from "@/utils/consts";
import { updateUser } from "../../../../server/db/actions/User";

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because user ID is not in valid format.",
      });
    }

    const { success, error, data } = userUpdateSchema
      .partial()
      .strict()
      .refine(
        (data) => data.name || data.role,
        "Must update either name or role",
      )
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
        let message = error.errors[0].message;

        return res.status(422).send({
          success: false,
          message: message,
        });
      }
    }

    let updatedUserObject;
    // TODO: grab user from session
    const user = {
      role: "Admin",
    };
    try {
      if (user.role === "Admin") {
        updatedUserObject = await updateUser(req.query.id, data);
      } else {
        delete data.role;
        // TODO: check if the user _id from session == user _id they are trying to update
        updatedUserObject = await updateUser(req.query.id, data);
      }
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: e.message,
      });
    }

    if (!updatedUserObject) {
      return res.status(404).json({
        success: false,
        message: "Cannot update user because user does not exist",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Sucessfully updated user",
        data: updatedUserObject,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
