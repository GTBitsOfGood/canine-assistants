import { getDogs } from "../../../../server/db/actions/Dog";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const dogs = await getDogs();

      return res.status(200).json({
        success: true,
        payload: dogs,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
}
