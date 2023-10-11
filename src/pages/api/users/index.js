import { createUser } from "../../../../server/db/actions/User";
import { z } from "zod";
import { consts } from "@/utils/consts";

const userSchema = z.object({
  username: z.string(),
  hash: z.enum(consts.topicArray),
});

export default async function handler(req, res) {
  const { username, hash } = req.query;

  console.log(hash);
  let userId;
  try {
    userId = await createUser(username, hash);
  } catch (e) {
    res.status(500).json({ error: "Unable to create user" });
    return;
  }

  res.status(200).json({ id: userId });
}
