import { userInviteSchema } from "@/utils/consts";
import { getUsers } from "../../../../server/db/actions/User";
import { createUser } from "../../../../server/db/actions/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getUserById } from "../../../../server/db/actions/User";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const users = await getUsers();

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved users",
        data: users,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  } else if (req.method == "POST") {
    const { error, data } = userInviteSchema.safeParse(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    try {
      const session = await getServerSession(req, res, authOptions);
      const user = await getUserById(session.user._id);
      console.log(user);

      if (user.role !== "Admin" && user.role !== "Manager") {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to invite users",
        });
      }

      const { name, email, role, acceptedInvite, isActive } = data;

      const existingUser = await getUsers({ email: email });
      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User with email already exists",
        });
      }

      try {
        await createUser({
          name: name,
          email: email,
          role: role,
          acceptedInvite: acceptedInvite,
          isActive: isActive,
          emailVerified: false,
        });
      } catch (e) {
        return res.status(500).json({
          success: false,
          message: "Unable to create user, please try again.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Successfully sent user invite",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
