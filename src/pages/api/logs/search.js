import { getLogs } from "../../../../server/db/actions/Log";
import { z } from "zod";
import mongoose, { Types } from "mongoose";

const logSearch = z.object({
  author: z.string().refine((id) => {
    return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
  }),
});

export default async function handler(req, res) {
  const {
    success,
    error,
    data: filter,
  } = logSearch.safeParse(req.body ? req.body : {});

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    try {
      const data = await getLogs(filter);

      res.status(200).json({
        success: true,
        message: "Successfully retrieved logs",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }
}
