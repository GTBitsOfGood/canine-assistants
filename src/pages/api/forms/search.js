import { formSchema } from "@/utils/consts";
import { getForms } from "../../../../server/db/actions/Form";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const {
        success,
        error,
        data: filter,
      } = formSchema.partial().safeParse(req.body ? req.body : {});

      if (!success) {
        return res.status(422).json({
          success: false,
          message:
            "The field " + Object.keys(error.format())[1] + " is invalid",
        });
      }

      const data = await getForms(filter);

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
