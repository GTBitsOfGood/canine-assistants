import { getFormById } from "../../../../server/db/actions/Form";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const data = await getFormById(req.query);

      if (!data) {
        return res.status(404).send({
          success: false,
          error: "Unable to retrieve dog because it doesn't exist",
        });
      }

      return res.status(200).send({
        success: true,
        data: data,
      });
    } catch (error) {
      return res.status(500).send({ success: false, error: error.message });
    }
  }

  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
