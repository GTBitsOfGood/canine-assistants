import dbConnect from "../dbConnect";
import User from "../models/User";

export async function createUser(username, hash) {
  await dbConnect();
  const user = new User({ username, hash });
  try {
    await user.save();
  } catch (e) {
    throw new Error("Unable to create user");
  }

  return user._id;
}

/**
Updates a user
@param {*} userId ObjectId of log to update
@param {*} userData Object with log updates
*/
export async function updateUser(userId, userData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to update user, please try again");
  }

  try {
    return await User.findByIdAndUpdate({ _id: userId }, userData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update user");
  }
}
