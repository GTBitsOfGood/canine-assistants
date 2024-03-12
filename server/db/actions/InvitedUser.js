import dbConnect from "../dbConnect";
import InvitedUser from "../models/InvitedUser";

export async function createInvitedUser(data) {
  await dbConnect();
  let user;
  try {
    user = new InvitedUser(data);
    await user.save();
  } catch (e) {
    throw new Error(e);
  }

  return user._id;
}

export async function getInvitedUsers(filter = {}) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error(
      "Unable to get invited users at this time, please try again",
    );
  }

  return InvitedUser.find(filter);
}

export async function getInvitedUserById(id) {
  try {
    await dbConnect();
    return InvitedUser.findById(id);
  } catch (e) {
    throw new Error(
      "Unable to get invited user at this time, please try again.",
    );
  }
}

/*
@param {*} userId ObjectId of log to update
@param {*} userData Object with log updates
*/
export async function updateInvitedUser(userId, userData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to update invited user, please try again.");
  }

  try {
    return await InvitedUser.findByIdAndUpdate(userId, userData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update invited user");
  }
}
