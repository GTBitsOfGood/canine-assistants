import { Types } from "mongoose";
import {
  updateLog,
  deleteLog,
  getLogById,
} from "../../../../server/db/actions/Log";
import { z } from "zod";
import { consts } from "@/utils/consts";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";
import { getUserById } from "../../../../server/db/actions/User";

const logSchema = z.object({
  title: z.string(),
  topic: z.enum(consts.topicArray),
  tags: z.enum(consts.tagsArray).array(),
  severity: z.enum(consts.concernArray),
  description: z.string().optional(),
  resolved: z.boolean(),
  resolution: z.string().optional(),
  resolver: z.string().optional(),
});

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      if (!Types.ObjectId.isValid(id)) {
        return res.status(422).send({
          success: false,
          message: "Invalid ID",
        });
      }

      const data = await getLogById(id);

      if (data === null || data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Unable to retrieve log because it doesn't exist",
        });
        return;
      }

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved log",
        data: data,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
      return;
    }
  }

  if (req.method == "DELETE") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to delete because log id is not in valid format",
      });
    }

    return deleteLog(req.query.id)
      .then((id) => {
        return res.status(200).send({
          success: true,
          message: "Successfully deleted log",
          data: { _id: id },
        });
      })
      .catch((error) => {
        if (error.message == "Error: Invalid log ID") {
          return res.status(404).send({
            success: false,
            message: "Cannot delete log because log id does not exist",
          });
        }

        return res.status(500).send({
          success: false,
          message: "Cannot delete log at this time, please try again",
          error: error.message,
        });
      });
  }

  if (req.method == "PATCH") {
    if (!Types.ObjectId.isValid(req.query.id)) {
      return res.status(422).send({
        success: false,
        message: "Unable to update because log ID is not in valid format.",
      });
    }

    const { success, error, data } = logSchema.partial().safeParse(req.body);
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
        let message;
        const erroredKeys = error.errors[0].keys;
        if (
          erroredKeys &&
          (erroredKeys.includes("dog") || erroredKeys.includes("author"))
        ) {
          message = "Cannot update dog and/or author field!";
        } else {
          message = error.errors[0].message;
        }

        return res.status(422).send({
          success: false,
          message: message,
        });
      }
    }

    const session = await getServerSession(req, res, authOptions);
    const logData = await getLogById(req.query.id);
    const user = await getUserById(session.user._id);

    if (!session || !user) {
      return res.status(405).send({
        success: false,
        message: "Invalid session",
      });
    }

    const reqSize = Object.keys(req.body).length;

    if (user.role === "Manager") {
      if (session.user._id !== logData.author.toString()) {
        if (
          req.body.resolved === undefined ||
          req.body.resolution === undefined ||
          reqSize > 2
        ) {
          return res.status(403).send({
            success: false,
            message:
              "Managers can't edit log information unless they are the author",
          });
        }
        if (
          reqSize === 1 &&
          req.body.resolved === undefined &&
          req.body.resolution === undefined
        ) {
          return res.status(403).send({
            success: false,
            message:
              "Managers can't edit log information unless they are the author",
          });
        }
        if (
          reqSize === 2 &&
          (req.body.resolved === undefined || req.body.resolution === undefined)
        ) {
          return res.status(403).send({
            success: false,
            message:
              "Managers can't edit log information unless they are the author",
          });
        }
      }
      return updateLog(req.query.id, data)
        .then((updatedLogObject) => {
          return res.status(200).send({
            success: true,
            message: "Successfully updated log",
            data: updatedLogObject,
          });
        })
        .catch((error) => {
          return res.status(500).send({
            success: false,
            message: "An error occurred while updating the log.",
          });
        });
    } else {
      // role is user or admin
      // check if session.id === req.body author.id
      if (session.user._id !== logData.author.toString()) {
        return res.status(403).send({
          success: false,
          message: "Can not edit log that you do not own",
        });
      }
      // check if user/admin is trying to dit resolution status
      if (
        req.body.resolved !== logData.resolved ||
        logData.resolution !== req.body.resolution
      ) {
        return res.status(403).send({
          success: false,
          message: "Only Managers can update resolution properties",
        });
      }
      // succcess for user/admin
      req.body.resolved = logData.resolved;
      return updateLog(req.query.id, data)
        .then((updatedLogObject) => {
          return res.status(200).send({
            success: true,
            message: "Successfully updated log",
            data: updatedLogObject,
          });
        })
        .catch((error) => {
          return res.status(500).send({
            success: false,
            message: "An error occurred while updating the log.",
          });
        });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
