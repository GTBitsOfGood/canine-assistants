import { createLog } from "../../../../server/db/actions/Log";
import { z } from "zod";
import mongoose, { Types } from "mongoose";
import { consts } from "@/utils/consts";

const logSchema = z.object({
  title: z.string(),
  topic: z.enum(["Medical", "Behavioral", "Other"]),
  tags: z.enum(["auditory", "heartworm", "fleas/ticks"]).optional(),
  severity: z.enum(["No concern", "Some concern", "High concern"]),
  description: z.string().optional(),
  author: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  dog: z.string().refine((id) => {
    return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
  }),
});

export default async function handler(req, res) {
  const { success, error, data } = logSchema.safeParse(req.body);

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        error: "Invalid parameter: " + Object.keys(error.format())[1],
      });
    }

    let logId;
    try {
      logId = await createLog(data);
    } catch (e) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json({ id: logId });
  }
}
