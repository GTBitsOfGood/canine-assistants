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
