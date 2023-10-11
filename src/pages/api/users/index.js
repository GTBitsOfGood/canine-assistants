import { createUser } from "../../../../server/db/actions/User";

export default async function handler(req, res) {
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
