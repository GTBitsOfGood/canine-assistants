import { userRegistrationSchema } from "@/utils/consts";
import { createUser } from "../../../../server/db/actions/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { error, data } = userRegistrationSchema.safeParse(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    try {
      const { firstName, lastName, email, password } = data;

      bcrypt.hash(password + email, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        try {
          await createUser({
            name: firstName + " " + lastName,
            email: email,
            passwordHash: hash,
            emailVerified: false,
            role: "User",
          });
        } catch (e) {
          return res.status(500).json({
            success: false,
            message: "Unable to create user, please try again.",
          });
        }
      });
      return res.status(200).json({
        success: true,
        message: "Successfully created user",
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
