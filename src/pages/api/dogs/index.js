import { z } from "zod";
import mongoose, { Types } from "mongoose";
import { createDog } from "../../../../server/db/actions/Dog";
import { consts } from "@/utils/consts";

const dogSchema = z.object({
  name: z.string(),
  gender: z.enum(consts.genderPetArray),
  breed: z.string().toLowerCase(),
  weight: z.number(),
  behavior: z.enum(consts.concernArray),
  medical: z.enum(consts.concernArray),
  other: z.enum(consts.concernArray),
  recentLogs: z.array(
    z.string().refine((id) => {
      return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
    }),
  ),
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

export default function handler(req, res) {
  const { success, error, data } = dogSchema.safeParse(req.body);

  if (req.method == "POST") {
    if (!success) {
      return res
        .status(422)
        .send("The field " + Object.keys(error.format())[1] + " is invalid");
    }

    return createDog(data)
      .then(() => {
        return res.status(200).send("New dog successfully created!");
      })
      .catch((error) => {
        return res.status(500).send(error.message);
      });
  }
}
