// This file will be deleted in the future
import { z } from "zod";

const nameSchema = z.object({
  name: z.string().toLowerCase(),
});

export default function handler(req, res) {
  const { success, data } = nameSchema.safeParse(req.query);

  if (!success) {
    res.status(400).json({ error: "Invalid query parameter" });
  }

  res.status(200).json(data);
}
