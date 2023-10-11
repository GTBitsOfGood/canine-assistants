import { z } from "zod";
import { consts } from "@/utils/consts";
import nextAuth from "next-auth";
import { updateUser } from "../../../../server/db/actions/User";

const userSchema = z.object({
  username: z.string(),
  hash: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
  emailVerified: z.boolean().default(null),
  role: z.array(z.enum(consts.roleArray)).optional(),
});

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because user ID is not in valid format.",
      });
    }

    const user = await nextAuth.user();

    if (user.isAdmin) {
      // The user is an admin
    } else {
      // The user is a user
    }

    const { success, error, data } = userSchema
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
        let message = error.errors[0].message;

        return res.status(422).send({
          success: false,
          message: message,
        });
      }
    }

    return updateUser(req.query.id, data)
      .then((updatedUserObject) => {
        if (!updatedUserObject) {
          return res.status(404).send({
            success: false,
            message: "Cannot update user because user does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Sucessfully updated user",
            data: updatedUserObject,
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

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
