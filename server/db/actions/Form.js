import dbConnect from "../dbConnect";
import Form from "../models/Form";

export async function deleteForm(formId) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to delete form at this time, please try again");
  }
}
