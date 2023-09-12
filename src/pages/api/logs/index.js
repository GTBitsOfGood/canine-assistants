import { createLog } from "../../../../server/db/actions/Log";
import { z } from "zod";
import { SchemaTypes } from "mongoose";

const logSchema = z.object({
  title: z.string(),
  topic: z.enum(["Medical", "Behavioral", "Other"]),
  tags: z.enum(["auditory", "heartworm", "fleas/ticks"]).optional(),
  severity: z.enum(["No concern", "Some concern", "High concern"]),
  description: z.string().optional(),
  author: z.instanceof(SchemaTypes.ObjectId),
  dog: z.instanceof(SchemaTypes.ObjectId),
});

export default async function handler(req, res) {
  const { success, error, data } = logSchema.safeParse(req.query);

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({ error: "Invalid query parameter" });
    }

    let logId;
    try {
      logId = await createLog(logData);
    } catch (e) {
      res.status(500).json({ error: "Unable to create log" });
      return;
    }

    res.status(200).json({ id: logId });
  }
}
