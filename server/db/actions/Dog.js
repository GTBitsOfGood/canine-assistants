import { consts } from "@/utils/consts";
import dbConnect from "../dbConnect";
import Dog from "../models/Dog";
import Log from "../models/Log";
import User from "../models/User";
import { deleteImage } from "./Image";

export async function getDogs(filter = {}, fields = null) {
  try {
    await dbConnect();

    if (filter["name"] !== undefined) {
      filter.name = { $regex: filter.name, $options: "i" };
    }

    const arrayFilters = [
      "location",
      "behavior",
      "medical",
      "other",
      "instructors",
    ];

    for (let i = 0; i < arrayFilters.length; i++) {
      let field = arrayFilters[i];

      if (filter[field] !== undefined) {
        filter[field] = { $in: filter[field] };
      }
    }

    if (filter["recentLogTags"] !== undefined) {
      const logTagsFilter = filter["recentLogTags"];
      delete filter["recentLogTags"];

      return await Dog.aggregate([
        {
          $match: {
            ...filter,
          },
        },
        {
          $lookup: {
            from: "logs",
            localField: "recentLogs",
            foreignField: "_id",
            as: "recentLogs",
          },
        },
        {
          $match: {
            "recentLogs.tags": { $in: logTagsFilter },
          },
        },
        {
          $addFields: {
            recentLogTags: { $arrayElemAt: ["$recentLogs.tags", 0] },
          },
        },
      ]);
    }

    if (filter["partner"]) {
      for (let field in filter["partner"]) {
        let data = filter["partner"][field];

        if (typeof data == "string" && field != "user") {
          filter[`partner.${field}`] = new RegExp(data, "i");
        } else {
          filter[`partner.${field}`] = data;
        }
      }

      delete filter.partner;
    }
    if (fields === null || (fields && fields.includes("recentLogs"))) {
      return Dog.find(filter, fields).populate("recentLogs");
    } else {
      return Dog.find(filter, fields);
    }
  } catch (e) {
    throw new Error("Unable to get dogs at this time, please try again");
  }
}

export async function getAssociatedDogs(user, filter = {}, fields = null) {
  const associatedFilter = [
    consts.userAccess.Admin,
    consts.userAccess.Manager,
  ].includes(user.role)
    ? {}
    : {
        $or: [
          { "partner.user": user._id },
          { instructors: user._id },
          { caregivers: user._id },
          { volunteer: user._id },
        ],
      };
  return await getDogs({ ...filter, ...associatedFilter }, fields);
}

export async function getDogById(id) {
  try {
    await dbConnect();
    return Dog.findById(id)
      .populate("instructors")
      .populate("partner")
      .populate("parents")
      .populate("caregivers");
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

  await validateDogData(dogData);

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

    await Log.deleteMany({ dog: id });

    const dog = await Dog.findByIdAndDelete({ _id: id });

    if (dog.image && dog.image != "") {
      const imageRes = await (await deleteImage(id, dog.image)).json();

      if (!imageRes.success) {
        throw new Error(
          "There was a problem deleting the dog's image, please delete manually",
        );
      }
    }

    return dog;
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

  await validateDogData(dogData);

  // Set image to empty string to be populated by uploadImage endpoint
  dogData["image"] = "";

  const dog = new Dog(dogData);

  try {
    await dog.save();
  } catch (e) {
    // throw new Error("Unable to create dog at this time, please try again");
    throw new Error(e);
  }
  return dog._id;
}

/**
 * Queries the database for the existence IDs found in dogData object
 * including the recentLogs, parents, partner, instructors, volunteer, and caregivers
 * @param {*} dogData Object that has been parsed by Zod for validity
 * @returns Nothing but throws an error for invalid IDs
 */
async function validateDogData(dogData) {
  // recentLogs array of Log IDs
  if (dogData.recentLogs && dogData.recentLogs.length) {
    const logCount = await Log.count({ _id: { $in: dogData.recentLogs } });
    if (logCount != dogData.recentLogs.length) {
      throw new Error("Log ID is not present in database");
    }
  }

  // parents array of Dog IDs
  if (dogData.parents) {
    const dogCount = await Dog.count({ _id: { $in: dogData.parents } });
    if (dogCount != dogData.parents.length) {
      throw new Error("Parent ID is not present in database");
    }
  }

  // partner Dog ID
  if (dogData.partner?.user && !(await User.findById(dogData.partner.user))) {
    throw new Error("Partner ID is not present in database");
  }

  // instructors array of User IDs
  if (dogData.instructors) {
    const instructorCount = await User.count({
      _id: { $in: dogData.instructors },
    });
    if (instructorCount != dogData.instructors.length) {
      throw new Error("Instructor ID is not present in database");
    }
  }

  // volunteer User ID
  if (dogData.volunteer && !(await User.findById(dogData.volunteer))) {
    throw new Error("Volunteer ID is not present in database");
  }

  // caregivers array of User IDs
  if (dogData.caregivers) {
    const caregiversCount = await User.count({
      _id: { $in: dogData.caregivers },
    });
    if (caregiversCount != dogData.caregivers.length) {
      throw new Error("Caregiver ID is not present in database");
    }
  }
}

export async function updateHasUnresolved(dogId, changeAmount) {
  try {
    await dbConnect();
    const dog = await Dog.findById(dogId);
    if (!dog) {
      throw new Error("Dog not found");
    }

    dog.hasUnresolved = dog.hasUnresolved + changeAmount;

    await updateDog(dogId, dog);

    return dog.hasUnresolved;
  } catch (error) {
    throw new Error(error);
  }
}
