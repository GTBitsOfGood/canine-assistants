import { getAssociatedDogs } from "../../../../server/db/actions/Dog";
import { z } from "zod";
import { Types } from "mongoose";
import { consts, limitedDogSchema } from "@/utils/consts";
import { getUserById } from "../../../../server/db/actions/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const dogSchema = z.object({
  name: z.string().optional(),
  location: z.array(z.enum(consts.locationArray)).optional(),
  behavior: z.array(z.enum(consts.concernArray)).optional(),
  medical: z.array(z.enum(consts.concernArray)).optional(),
  other: z.array(z.enum(consts.concernArray)).optional(),
  recentLogTags: z.array(z.enum(consts.tagsArray)).optional(),
  instructors: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    })
    .array()
    .optional(),
  volunteer: z
    .string()
    .refine((id) => {
      return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    })
    .optional(),
  partner: z
    .object({
      age: z.number().optional(),
      name: z.string().optional(),
      disability: z.string().optional(),
      user: z
        .string()
        .refine((id) => {
          return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
        })
        .optional(),
    })
    .optional(),
});

export default async function handler(req, res) {
  const {
    success,
    error,
    data: filter,
  } = dogSchema.safeParse(req.body ? req.body : {});

  if (req.method == "POST") {
    if (!success) {
      res.status(422).json({
        success: false,
        message: "Invalid parameter: " + Object.keys(error.format())[1],
      });
      return;
    }

    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).redirect("/login");
        return;
      }
      const user = await getUserById(session.user._id);
      let data = await getAssociatedDogs(user, filter);

      // Current logic: if we have a privileged association with at least one dog, then return
      // full information for all dogs, otherwise limited for all
      if (
        ![consts.userAccess.Admin, consts.userAccess.Manager].includes(
          user.role,
        ) &&
        data.every(
          (dog) =>
            !dog.instructors?.some((o) => o._id.equals(user._id)) &&
            !dog.caregivers?.some((o) => o._id.equals(user._id)),
        )
      ) {
        data = data.map((dog) => ({
          ...limitedDogSchema.safeParse(dog).data,
          recentLogs: dog.recentLogs.filter((log) =>
            log.author._id.equals(user._id),
          ),
          association: "Volunteer/Partner",
          _id: dog._id,
        }));
      } else {
        data.forEach(
          (dog) =>
            (dog.association = [
              consts.userAccess.Admin,
              consts.userAccess.Manager,
            ].includes(user.role)
              ? user.role
              : "Instructor/Caregiver"),
        );
      }

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message, data: [] });
      return;
    }
  }
}
