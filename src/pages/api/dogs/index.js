import { getToken } from "next-auth/jwt";
import {
  createDog,
  getAssociatedDogs,
} from "../../../../server/db/actions/Dog";
import { dogSchema } from "@/utils/consts";
import { getUserById } from "../../../../server/db/actions/User";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const fields = req.query.fields
        ? req.query.fields.split(",").join(" ")
        : "";

      const token = await getToken({ req });
      const user = await getUserById(token.sub);
      const data = await getAssociatedDogs(user, {}, fields);

      return res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      return;
    }
  } else if (req.method == "POST") {
    const { success, error, data } = dogSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).send({
        success: false,
        message: "The field " + Object.keys(error.format())[1] + " is invalid",
      });
    }

    if (data.birthOrder > data.litterSize) {
      return res.status(422).send({
        success: false,
        message: "Dog birth order cannot be greater than litter size",
      });
    }

    return createDog(data)
      .then((id) => {
        return res.status(201).send({
          success: true,
          message: "New dog successfully created!",
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
  return res.status(405).send({
    success: false,
    message: `Request method ${req.method} is not allowed`,
  });
}
