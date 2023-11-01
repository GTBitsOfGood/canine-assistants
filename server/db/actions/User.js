import dbConnect from "../dbConnect";
import User from "../models/User";
import bcrypt, { hash } from "bcrypt";

export async function createUser(data) {
  await dbConnect();
  let user;
  try {
    user = new User(data);
    await user.save();
  } catch (e) {
    throw new Error(e);
  }

  return user._id;
}

export async function getUsers(filter = {}) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to get users at this time, please try again");
  }

  return User.find(filter);
}

export async function getUserById(id) {
  try {
    await dbConnect();
    return User.findById(id);
  } catch (e) {
    throw new Error("Unable to get user at this time, please try again.");
  }
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
    throw new Error("Unable to update user, please try again.");
  }

  try {
    return await User.findByIdAndUpdate(userId, userData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update user");
  }
}


export async function verifyUser(email, password) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to verify user, please try again.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return {
      status: 404,
      message: "Unable to find user with specified email address."
    }
  }

  let userObj = user.toObject();

  if (userObj.passwordHash === undefined) {
    return {
      status: 400,
      message: "Invalid user."
    }
  }

  const matchedUser = await bcrypt.compare(password + email, userObj.passwordHash);

  if (matchedUser) {
    return {
      status: 200,
      message: user
    }
  } else {
    return {
      status: 400,
      message: "Invalid username or password."
    }
  }
}