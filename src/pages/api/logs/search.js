import { getLogs } from "../../../../server/db/actions/Log";
import { z } from "zod";
import { Types } from "mongoose";

const logParams = z.object({
  author: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  dog: z.string().refine((id) => {
    return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
  }),
  query: z.string(),
  filters: z.any(),
});

const logSearch = logParams.partial();

export default async function handler(req, res) {
  const {
    success,
    error,
    data: search,
  } = logSearch.safeParse(req.body ? req.body : {});

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    const topic = Object.values(search.filters?.topic || {});
    const severity = Object.values(search.filters?.severity || {});
    const tags = Object.values(search.filters?.tags || {});

    const filter = {
      dog: search.dog,
      $and: [
        {
          $or: [
            { title: { $regex: search.query, $options: "i" } },
            { description: { $regex: search.query, $options: "i" } },
          ],
        },
      ],
    };
    if (topic.length > 0) {
      filter.topic = { $in: topic };
    }
    if (severity.length > 0) {
      filter.severity = { $in: severity };
    }
    if (tags.length > 0) {
      filter.$and.push({
        $or: tags.map((tag) => {
          tags: tag;
        }),
      });
    }

    try {
      const data = await getLogs(filter);

      res.status(200).json({
        success: true,
        message: "Successfully retrieved logs",
        data: data,
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
