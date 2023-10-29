import dbConnect from "../dbConnect";
import Dog from "../models/Dog";
import User from "../models/User";
import Form from "../models/Form";

export async function createForm(formData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to create log at this time, please try again");
  }

  if (formData.user && !(await User.findById(formData.user))) {
    throw new Error("User ID is not present in database");
  }

  if (formData.dog && !(await Dog.findById(formData.dog))) {
    throw new Error("Dog ID is not present in database");
  }

  const form = new Form(formData);

  try {
    await form.save();
  } catch (e) {
    throw new Error(e);
  }

  return form._id;
}
