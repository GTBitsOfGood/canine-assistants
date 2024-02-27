import { getLogs } from "../../../../server/db/actions/Log";
import { z } from "zod";
import { Types } from "mongoose";
import { consts } from "@/utils/consts";
import { getUserById } from "../../../../server/db/actions/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getDogById } from "../../../../server/db/actions/Dog";
import { logSchema } from "@/utils/consts";

const logParams = z.object({
  author: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  query: z.string().optional(),
  filters: z
    .object({
      topic: z.array(z.enum(consts.topicArray)).optional(),
      severity: z.array(z.enum(consts.concernArray)).optional(),
      tags: z.array(z.enum(consts.tagsArray)).optional(),
      resolved: z.boolean(z).optional(),
    })
    .optional(),
});

const logSearch = logParams.partial();

export default async function handler(req, res) {
  const {
    success,
    error,
    data: search,
  } = logSearch.safeParse(req.body ? req.body : {});

  // console.log(req.body)
  // console.log("log")
  // console.log(req.body)
  // console.log(logSearch.safeParse(req.body ? req.body : {}))

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    const query = search.query || "";
    const topic = search.filters?.topic || [];
    const severity = search.filters?.severity || [];
    const tags = search.filters?.tags || [];
    const resolved = search.filters?.resolved || false;

    /* 
    note: a log can have multiple tags, so we check if ANY of the 
    applied tag filters match ANY of the log tags; for other types, it 
    must be an exact match.
    */
    const filter = {
      dog: search.dog,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };
    if (resolved !== undefined) {
      filter.resolved = resolved;
    }
    if (topic.length > 0) {
      filter.topic = { $in: topic };
    }
    if (severity.length > 0) {
      filter.severity = { $in: severity };
    }
    if (tags.length > 0) {
      filter.tags = {
        $elemMatch: {
          $in: tags,
        },
      };
    }

    try {
      const data = await getLogs(filter);

      const session = await getServerSession(req, res, authOptions);
      const user = await getUserById(session.user._id);

      let userAccessData = data;

      if (user.role === "User") {
        let dogData = await getDogById(filter.dog);
        if (
          dogData &&
          !dogData.instructors?.some((o) => o._id.equals(user._id)) &&
          !dogData.caregivers?.some((o) => o._id.equals(user._id))
        ) {
          userAccessData = data.filter((log) =>
            log.author._id.equals(user._id),
          );
        }
      }

      res.status(200).json({
        success: true,
        message: "Successfully retrieved logs",
        data: userAccessData,
      });
      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
