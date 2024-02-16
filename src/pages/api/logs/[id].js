import mongoose, { Types } from "mongoose";
import {
  updateLog,
  deleteLog,
  getLogById,
} from "../../../../server/db/actions/Log";
import { getUserById } from "../../../../server/db/actions/User";
import { z } from "zod";
import { consts } from "@/utils/consts";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth].js";

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

    const { success, error, data } = logSchema.safeParse(req.body);
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
    if (!session || session.user.role !== "User") {
      //TODO: Change this after testing to Manager, it's just easier to test the session as role === user
      return res.status(403).send({
        success: false,
        message: "Only Managers are allowed to resolve logs",
      });
    }

    console.log(
      "Someone with a " +
        session.user.role +
        " role is updating log resolution",
    );
    if (data.resolved) {
      // only if request contains resolved: true
      data.resolver = session.user._id;

      return updateLog(req.query.id, data)
        .then((updatedLogObject) => {
          if (!updatedLogObject) {
            return res.status(404).send({
              success: false,
              message: "Cannot update log because log does not exist!",
            });
          } else {
            return res.status(200).send({
              success: true,
              message: "Successfully updated log",
              data: updatedLogObject,
            });
          }
        })
        .catch((error) => {
          return res.status(500).send({
            success: false,
            message: "An error occurred while updating the log.",
            error: error.message,
          });
        });
    } else {
      // is request contains resolved = false
      data.resolution = "";
      data.resolver = null;
      return updateLog(req.query.id, data)
        .then((updatedLogObject) => {
          if (!updatedLogObject) {
            return res.status(404).send({
              success: false,
              message: "Cannot update log because log does not exist!",
            });
          } else {
            return res.status(200).send({
              success: true,
              message: "Successfully updated log",
              data: updatedLogObject,
            });
          }
        })
        .catch((error) => {
          return res.status(500).send({
            success: false,
            message: "An error occurred while updating the log.",
            error: error.message,
          });
        });
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
