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
    // TODO:
    // The severity + topic of the log should change that specific status on the associated Dog
    // Ex. A log with severity of High concern for topic Medical should change the medical attribute on the Dog to High concern
    // The new log should replace the oldest log on the Dog's recentLogs attribute. If there are less than 2 logs in recentLogs, just append the new log

    res.status(200).json({ id: logId });
  }
}
