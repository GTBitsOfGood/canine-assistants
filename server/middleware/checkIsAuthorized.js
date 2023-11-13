import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function checkIsAuthorized(req, res, data = null) {
  const session = await getServerSession(req, res, authOptions);

  if (data) {
    // Check instructor, caregivers, partner, volunteer, or is admin

    // data === dogObjectChecks
    const checkInstructors = data.instructors;
    const checkCaregivers = data.caregivers;
    const checkVolunteer = data.volunteer;
    const checkPartner = data.partner;

    // data === formObjectChecks
    const checkUserAuthored = data.userAuthored;

    // data === userObjectChecks
    const checkUser = data.user;

    const isInstructor =
      checkInstructors &&
      data.dog.instructors?.some(
        (instructor) => instructor._id.toString() === session.user._id,
      );

    const isCaregiver =
      checkCaregivers &&
      data.dog.caregivers?.some(
        (instructor) => instructor._id.toString() === session.user._id,
      );

    const isPartner =
      checkPartner && data.dog.partner?.user === session.user._id;
    const isVolunteer =
      checkVolunteer && data.dog.volunteer?._id.toString() === session.user._id;

    const isUserAuthor =
      checkUserAuthored && data.form.toString() === session.user_id;

    const isUser = checkUser && data.user._id === session.user_id;

    const isAuthorized =
      session &&
      (session.user.role === "Admin" ||
        isInstructor ||
        isCaregiver ||
        isPartner ||
        isVolunteer ||
        isUserAuthor);

    if (!isAuthorized) {
      res.status(401).json({
        success: false,
        message:
          "User must be an admin or associated to the dog to access this resource",
      });
      return;
    }
  } else {
    if (!session || session.user.role !== "Admin") {
      res.status(401).json({
        success: false,
        message: "User must be an admin to access this resource",
      });
      return;
    }
  }

  return session;
}
