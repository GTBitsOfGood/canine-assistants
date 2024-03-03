import { formSchema } from "@/utils/consts";
import { getForms } from "../../../../server/db/actions/Form";
import { getUserById } from "../../../../server/db/actions/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getDogById } from "../../../../server/db/actions/Dog";

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

      const session = await getServerSession(req, res, authOptions);
      const user = await getUserById(session.user._id);

      if (user.role === "User") {
        let dogData = await getDogById(filter.dog);
        if (
          dogData &&
          !dogData.instructors?.some((o) => o._id.equals(user._id)) &&
          !dogData.caregivers?.some((o) => o._id.equals(user._id))
        ) {
          filter.user = user._id;
        }
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
