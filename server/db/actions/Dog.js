import dbConnect from "../dbConnect";
import Dog from "../models/Dog";

/**
 * Deletes a dog from the database based on an ObjectId
 * @param {*} id ObjectId of dog to delete
 * @returns deleted dog object if deleted successfully, null if id
 *          not found, or an error if there is a server/database error
 */
export async function deleteDog(id) {
  await dbConnect();

  try {
    return await Dog.findByIdAndDelete({ _id: id });
  } catch (e) {
    throw new Error("Unable to delete dog");
  }
}
