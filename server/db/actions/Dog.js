import dbConnect from "../dbConnect";
import Dog from "../models/Dog";

export async function getDogs(filter = null) {
  await dbConnect();

  try {
    return Dog.find({ filter });
  } catch (e) {
    throw new Error("Unable to get dogs at this time, please try again");
  }
}

export async function getDogById(id) {
  await dbConnect();

  try {
    return Dog.findById(id);
  } catch (e) {
    throw new Error("Unable to get dog by Id at this time, please try again");
  }
}
