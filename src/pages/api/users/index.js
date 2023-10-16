import { getUsers } from "../../../../server/db/actions/User";

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
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}

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
