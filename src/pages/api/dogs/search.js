import { getDogs } from "../../../../server/db/actions/Dog";
import { z } from "zod";
import mongoose, { Types } from "mongoose";

const dogSchema = z.object({
  name: z.string().optional(),
  location: z.enum(["Facility 1", "Facility 2", "Placed"]).optional(),
  behavior: z.enum(["No concern", "Some concern", "High concern"]).optional(),
  medical: z.enum(["No concern", "Some concern", "High concern"]).optional(),
  other: z.enum(["No concern", "Some concern", "High concern"]).optional(),
  instructors: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .array()
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  partner: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
});

export default async function handler(req, res) {
  const {
    success,
    error,
    data: filter,
  } = dogSchema.safeParse(req.body ? req.body : {});

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        error: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    try {
      const data = await getDogs(filter);

      if (data.length === 0) {
        res.status(404).json({
          success: false,
          error:
            "Unable to retrieve dog with these filters because it doesn't exist",
        });
        return;
      }

      res.status(200).json({ success: true, payload: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }
  }
}
