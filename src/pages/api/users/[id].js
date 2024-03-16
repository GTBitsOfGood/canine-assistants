import { Types } from "mongoose";
import { getUserById, updateUser } from "../../../../server/db/actions/User";
import { userUpdateSchema } from "@/utils/consts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { updateInvitedUser } from "../../../../server/db/actions/InvitedUser";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(422).send({
          success: false,
          message: "Invalid User ID",
        });
      }

      const data = await getUserById(id);

      if (data === null || data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Unable to retrieve user because it doesn't exist",
        });
        return;
      }

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved user",
        data: data,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
      return;
    }
  } else if (req.method == "PATCH") {
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
        (data) =>
          data.name ||
          data.role ||
          data.hasOwnProperty("isActive") ||
          data.hasOwnProperty("acceptedInvite"),
        "Must update either name, role, status, or invite status.",
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

    try {
      // Admins and Managers can update any user
      if (session.user.role === "Admin" || session.user.role === "Manager") {
        const updatedUserObject = await updateUser(req.query.id, data);
        const updatedInvitedUserObject = await updateInvitedUser(req.query.id, {
          email: data.email,
          role: data.role,
          isActive: data.isActive,
          acceptedInvite: data.acceptedInvite,
        });
        if (!updatedUserObject && !updatedInvitedUserObject) {
          return res.status(404).json({
            success: false,
            message: "Cannot update user because user does not exist",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Sucessfully updated user",
          data: updatedUserObject || updatedInvitedUserObject,
        });
      } else if (data.role) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized to update user role",
        });
      }
      // Users can only update their own name
      if (session.user._id === req.query.id) {
        const updateObject = {};
        if (typeof data.isActive === "boolean") {
          updateObject.isActive = data.isActive;
        }
        if (data.name) {
          updateObject.name = data.name;
        }
        const updatedUserObject = await updateUser(req.query.id, updateObject);
        const updatedInvitedUserObject = await updateInvitedUser(
          req.query.id,
          updateObject,
        );
        // console.log(updatedUserObject);
        if (!updatedUserObject && !updatedInvitedUserObject) {
          return res.status(404).json({
            success: false,
            message: "Cannot update user because user does not exist",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Sucessfully updated user",
          data: updatedUserObject || updatedInvitedUserObject,
        });
      }
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: e.message,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
