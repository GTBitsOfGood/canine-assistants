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

/*
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
/*
@param {*} email String email of user to sign up
@param {*} password String password of user to sign up
@param {*} name String name of user to sign up
*/
export async function signup(email, password, name) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to update user, please try again.");
  }

  let user = await User.findOne({ email });

  if (!user) {
    return {
      status: 404,
      message: "User must be invited to sign up. Please contact an admin.",
    };
  }

  if (user && user.acceptedInvite) {
    return {
      status: 400,
      message: "User has already signed up. Please log in instead.",
    };
  }

  bcrypt.hash(password + email, 10, async function (err, hash) {
    if (err) {
      return {
        status: 500,
        message: "Error hashing password.",
      };
    } else {
      try {
        user = await User.findByIdAndUpdate(
          user.id,
          { name: name, passwordHash: hash, acceptedInvite: true },
          {
            returnDocument: "after",
          },
        );
      } catch (e) {
        return {
          status: 500,
          message: "Unable to verify user, please try again.",
        };
      }
    }
  });
  return {
    status: 200,
    message: "User has been signed up.",
    user: user,
  };
}

export async function verifyUser(email, password) {
  try {
    await dbConnect();
  } catch (e) {
    return {
      status: 500,
      message: "Unable to verify user, please try again.",
    };
  }

  const user = await User.findOne({ email });

  if (!user) {
    return {
      status: 404,
      message: "Please contact an Adminstrator to be invited.",
    };
  }

  let userObj = user.toObject();

  if (userObj.acceptedInvite === false) {
    return {
      status: 400,
      message: "To use this application you must first sign up.",
    };
  }

  if (userObj.isActive === false) {
    return {
      status: 400,
      message: "User is inactive.",
    };
  }

  if (userObj.passwordHash === undefined) {
    return {
      status: 400,
      message: "Invalid user.",
    };
  }

  const matchedUser = await bcrypt.compare(
    password + email,
    userObj.passwordHash,
  );

  if (matchedUser) {
    return {
      status: 200,
      message: "User has been verified.",
      user: user,
    };
  } else {
    return {
      status: 400,
      message: "Invalid username or password.",
    };
  }
}
