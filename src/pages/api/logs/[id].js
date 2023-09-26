import mongoose, { Types } from "mongoose";
import { updateLog } from "../../../../server/db/actions/Log";
import { z } from "zod";
import { consts } from "@/utils/consts";

const logSchema = z.object({
  title: z.string(),
  topic: z.enum(consts.topicArray),
  tags: z.enum(consts.tagsArray).array().optional(),
  severity: z.enum(consts.concernArray),
  description: z.string().optional(),
  author: z.string().refine((id) => {
    return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return mongoose.isValidObjectId(id) ? new Types.ObjectId(id) : null;
  }),
});

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    if (!mongoose.isValidObjectId(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because log ID is not in valid format.",
      });
    }
    const { success, error, data } = logSchema
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

    return updateLog(req.query.id, data)
      .then((results) => {
        if (!results) {
          return res.status(404).send({
            success: false,
            message: "Cannot update log because log does not exist!",
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "log sucessfully updated!",
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
