import { getAssociatedDogs, getDogs } from "../../../../server/db/actions/Dog";
import { z } from "zod";
import { Types } from "mongoose";
import { consts } from "@/utils/consts";
import { getToken } from "next-auth/jwt";

const dogSchema = z.object({
  name: z.string().optional(),
  location: z.array(z.enum(consts.locationArray)).optional(),
  behavior: z.array(z.enum(consts.concernArray)).optional(),
  medical: z.array(z.enum(consts.concernArray)).optional(),
  other: z.array(z.enum(consts.concernArray)).optional(),
  recentLogTags: z.array(z.enum(consts.tagsArray)).optional(),
  instructors: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    })
    .array()
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  partner: z
    .object({
      age: z.number().optional(),
      name: z.string().optional(),
      disability: z.string().optional(),
      user: z
        .string()
        .refine((id) => {
          return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
        })
        .optional(),
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
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    try {
      const user = await getToken({ req });
      const data = await (user.role === "Admin"
        ? getDogs(filter)
        : getAssociatedDogs(user.sub, filter));

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }
  }
}
