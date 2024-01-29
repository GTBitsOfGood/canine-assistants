import { backblazeConnect } from "../../../../server/db/actions/Image";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const results = await backblazeConnect();

    if (results.success) {
      return res.status(200).send({
        success: true,
        message: "Backblaze successfully connected",
        data: results.data,
      });
    } else {
      return res.status(400).send({
        success: false,
        data: results.error,
      });
    }
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
