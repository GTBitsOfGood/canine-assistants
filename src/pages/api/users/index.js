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
