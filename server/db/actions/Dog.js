import dbConnect from "../dbConnect";
import Dog from "../models/Dog";

export async function createDog(dogData) {
  await dbConnect();

  const dog = new Dog(dogData);

  try {
    await dog.save();
  } catch (e) {
    throw new Error("Unable to create dog, please try again");
  }

  return dog._id;
}
