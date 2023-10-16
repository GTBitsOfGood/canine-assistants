import mongoose from "mongoose";
import { z } from "zod";
import { consts } from "@/utils/consts";
import { getUserById } from "../../../../server/db/actions/User";

const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
  emailVerified: z.boolean().default(null),
  role: z.array(z.enum(consts.roleArray)).optional(),
});

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(422).send({
          success: false,
          message: "Invalid Object ID",
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
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
