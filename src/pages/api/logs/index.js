import { createLog, getLogs } from "../../../../server/db/actions/Log";
import { getDogById } from "../../../../server/db/actions/Dog";
import { logSchema } from "@/utils/consts";

export default async function handler(req, res) {
  const { success, error, data } = logSchema.safeParse(req.body);

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }
    let logId;
    try {
      logId = await createLog(data);
      const dog = getDogById(req.query.dog);
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
      return;
    }

    return res.status(201).json({
      success: true,
      message: "Log successfully created",
      data: { _id: logId },
    });
  }

  if (req.method == "GET") {
    try {
      const logs = await getLogs();

      return res.status(200).json({
        success: true,
        message: "Successfully retrieved logs",
        data: logs,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message,
      });
      return;
    }
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
