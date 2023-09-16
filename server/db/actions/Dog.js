import dbConnect from "../dbConnect";
import Dog from "../models/Dog";
import Log from "../models/Log";
import User from "../models/User";

/**
 * Creates a new dog in the database
 * @param {*} dogId ID of the Dog Object to be updated
 * @param {*} dogData Object that has been parsed by Zod for validity
 * @returns string id of the dog if successfully saved, error otherwise
 */
export async function updateDog(dogId, dogData) {
  await dbConnect();

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

  const dog = new Dog(dogData);

  try {
    return await Dog.findByIdAndUpdate({ _id: dogId }, dogData);
  } catch (e) {
    throw new Error("Unable to update dog");
  }
}
