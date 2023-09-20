import dbConnect from "../dbConnect";
import Dog from "../models/Dog";
import Log from "../models/Log";
import User from "../models/User";

export async function getDogs(filter = {}) {
  try {
    await dbConnect();

    if (filter["name"]) {
      filter.name = new RegExp(filter.name, "i");
    }

    if (filter["instructors"]) {
      filter.instructors = { $in: filter.instructors };
    }

    return Dog.find(filter).populate("recentLogs");
  } catch (e) {
    throw new Error("Unable to get dogs at this time, please try again");
  }
}

export async function getDogById(id) {
  try {
    await dbConnect();
    return Dog.findById(id)
      .populate("instructors")
      .populate("partner")
      .populate("parents");
  } catch (e) {
    throw new Error("Unable to get dog by Id at this time, please try again");
  }
}

/**
 * Updates an existing dog in the database
 * @param {*} dogId ID of the Dog Object to be updated
 * @param {*} dogData Dog Object that has been parsed by Zod for validity
 * @returns the Dog Object prior to the update; error otherwise
 */
export async function updateDog(dogId, dogData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to update dog, please try again");
  }

  // recentLogs array
  if (dogData.recentLogs && dogData.recentLogs.length) {
    for (let i = 0; i < dogData.recentLogs.length; i++) {
      if (!(await Log.findById(dogData.recentLogs[i]))) {
        throw new Error("Log ID is not present in database");
      }
    }
  }

  // parents array
  if (dogData.parents) {
    for (let i = 0; i < dogData.parents.length; i++) {
      if (!(await Dog.findById(dogData.parents[i]))) {
        throw new Error("Parent ID is not present in database");
      }
    }
  }

  // partner
  if (dogData.partner && !(await User.findById(dogData.partner))) {
    throw new Error("Partner ID is not present in database");
  }

  // instructors array User
  if (dogData.instructors) {
    for (let i = 0; i < dogData.instructors.length; i++) {
      if (!(await User.findById(dogData.instructors[i]))) {
        throw new Error("Instructor ID is not present in database");
      }
    }
  }

  // volunteer
  if (dogData.volunteer && !(await User.findById(dogData.volunteer))) {
    throw new Error("Volunteer ID is not present in database");
  }

  try {
    return await Dog.findByIdAndUpdate({ _id: dogId }, dogData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update dog");
  }
}

/**
 * Deletes a dog from the database based on an ObjectId
 * @param {*} id ObjectId of dog to delete
 * @returns deleted dog object if deleted successfully, null if id
 *          not found, or an error if there is a server/database error
 */
export async function deleteDog(id) {
  try {
    await dbConnect();
    return await Dog.findByIdAndDelete({ _id: id });
  } catch (e) {
    throw new Error("Unable to delete dog");
  }
}

/**
 * Creates a new dog in the database
 * @param {*} dogData Object that has been parsed by Zod for validity
 * @returns string id of the dog if successfully saved, error otherwise
 */
export async function createDog(dogData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to create dog at this time, please try again");
  }

  // recentLogs array
  if (dogData.recentLogs.length) {
    for (let i = 0; i < dogData.recentLogs.length; i++) {
      if (!(await Log.findById(dogData.recentLogs[i]))) {
        throw new Error("Log ID is not present in database");
      }
    }
  }

  // parents array
  if (dogData.parents) {
    for (let i = 0; i < dogData.parents.length; i++) {
      if (!(await Dog.findById(dogData.parents[i]))) {
        throw new Error("Parent ID is not present in database");
      }
    }
  }

  // partner
  if (dogData.partner && !(await User.findById(dogData.partner))) {
    throw new Error("Partner ID is not present in database");
  }

  // instructors array User
  if (dogData.instructors) {
    for (let i = 0; i < dogData.instructors.length; i++) {
      if (!(await User.findById(dogData.instructors[i]))) {
        throw new Error("Instructor ID is not present in database");
      }
    }
  }

  // volunteer
  if (dogData.volunteer && !(await User.findById(dogData.volunteer))) {
    throw new Error("Volunteer ID is not present in database");
  }

  const dog = new Dog(dogData);

  try {
    await dog.save();
  } catch (e) {
    throw new Error("Unable to create dog at this time, please try again");
  }
  return dog._id;
}
