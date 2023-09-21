import { getDogs, createDog } from "../../../../server/db/actions/Dog";
import { z } from "zod";
import mongoose, { Types } from "mongoose";
import { consts } from "@/utils/consts";

const dogSchema = z.object({
  name: z.string(),
  gender: z.enum(consts.genderPetArray),
  breed: z.string().toLowerCase(),
  weight: z.number(),
  behavior: z.enum(consts.concernArray),
  medical: z.enum(consts.concernArray),
  other: z.enum(consts.concernArray),
  recentLogs: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .default([]),
  parents: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  dateOfBirth: z.coerce.date(),
  litterSize: z.number().optional(),
  birthOrder: z.number().min(1).optional(),
  maternalDemeanor: z.enum(consts.demeanorArray).optional(),
  location: z.enum(consts.locationArray),
  rolePlacedAs: z.enum(consts.roleArray).optional(),
  partner: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  toiletArea: z.enum(consts.leashArray).optional(),
  housemates: z
    .array(
      z.object({
        age: z.number().optional(),
        gender: z.enum(consts.genderPersonArray).optional(),
        relationshipToPartner: z.enum(consts.relationshipArray).optional(),
      }),
    )
    .optional(),
  petmates: z
    .array(
      z.object({
        animal: z.string().toLowerCase().optional(),
        age: z.number().optional(),
        gender: z.enum(consts.genderPetArray).optional(),
      }),
    )
    .optional(),
  instructors: z
    .array(
      z.string().refine((id) => {
        return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
      }),
    )
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
});

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const data = await getDogs();

      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }
  } else if (req.method == "POST") {
    const { success, error, data } = dogSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).send({
        success: false,
        message: "The field " + Object.keys(error.format())[1] + " is invalid",
      });
    }

    if (data.birthOrder > data.litterSize) {
      return res.status(422).send({
        success: false,
        message: "Dog birth order cannot be greater than litter size",
      });
    }

    return createDog(data)
      .then((id) => {
        return res.status(201).send({
          success: true,
          message: "New dog successfully created!",
          data: { _id: id },
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      });
  }
  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
