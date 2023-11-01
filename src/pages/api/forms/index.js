import { validateForm } from "@/utils/formUtils";
import { formSchema } from "@/utils/consts";
import { createForm } from "../../../../server/db/actions/Form";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { success, error, data } = formSchema.safeParse(req.body);

    if (!success) {
      return res.status(422).send({
        success: false,
        message: "The field " + Object.keys(error.format())[1] + " is invalid",
      });
    }

    const results = validateForm(data.type, data.responses);

    if (!results.success) {
      return res.status(422).send(results);
    }

    return createForm(data)
      .then((id) => {
        return res.status(201).send({
          success: true,
          message: "New form successfully created!",
          data: { _id: id },
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      });
  }

  return res.status(405).json({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
