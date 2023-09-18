import dbConnect from "../dbConnect";
import Dog from "../models/Dog";

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
