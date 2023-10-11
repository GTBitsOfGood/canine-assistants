import { createUser, getUsers } from "../../../../server/db/actions/User";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, hash } = req.query;

    let userId;
    try {
      userId = await createUser(username, hash);
    } catch (e) {
      res.status(500).json({ error: "Unable to create user" });
      return;
    }

    res.status(200).json({ id: userId });
  }

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
