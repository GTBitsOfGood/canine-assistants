import { getDogById } from "../../../../server/db/actions/Dog";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const { id } = req.query;
      const data = await getDogById(id);

      if (data.length === 0) {
        res.status(404).json({
          success: false,
          error: "Unable to retrieve dog because it doesn't exist",
        });
        return;
      }

      return res.status(200).json({
        success: true,
        payload: data,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
  }
}
