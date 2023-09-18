import { getDogs } from "../../../../server/db/actions/Dog";

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
  }
}
