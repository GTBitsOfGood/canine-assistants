import { createLog } from "../../../../server/db/actions/Log";
import { z } from "zod";
import mongoose, { Types } from "mongoose";
import { consts } from "@/utils/consts";

const logSchema = z.object({
  title: z.string(),
  topic: z.enum(consts.topicArray),
  tags: z.enum(consts.tagsArray).optional(),
  severity: z.enum(consts.concernArray),
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
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
    }

    let logId;
    try {
      logId = await createLog(data);
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Log successfully created",
      data: logId,
    });
  }

  res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
