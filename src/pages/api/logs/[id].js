import { getLogById } from "../../../../server/db/actions/Log";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
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

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
