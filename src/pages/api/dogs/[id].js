import mongoose, { Types } from "mongoose";
import { deleteDog, updateDog } from "../../../../server/db/actions/Dog";
import { z } from "zod";
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

export default function handler(req, res) {
  if (req.method == "DELETE") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because dog id is not in valid format",
      });
    }

    return deleteDog(req.query.id)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot delete dog because dog does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Dog sucessfully deleted",
            data: results._id,
          });
        }
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: "Unable to delete dog, please try again",
        });
      });
  } else if (req.method == "PATCH") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because dog ID is not in valid format.",
      });
    }
    const { success, error, data } = dogSchema
      .partial()
      .strict()
      .safeParse(req.body);

    if (!success) {
      const code = error.errors[0].code;
      if (code == "invalid_type") {
        return res.status(422).send({
          success: false,
          message:
            "For field " +
            error.errors[0].path +
            " expected type " +
            error.errors[0].expected +
            ", but received " +
            error.errors[0].received,
        });
      } else {
        console.log(error);
        return res.status(422).send({
          success: false,
          message: error.errors[0].message,
        });
      }
    }

    return updateDog(req.query.id, data)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot update dog because dog does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Dog sucessfully updated!",
            data: results,
          });
        }
      })
      .catch((e) => {
        return res.status(500).send({
          success: false,
          message: e.message,
        });
      });
  }
  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}