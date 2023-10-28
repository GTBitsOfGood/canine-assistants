import dbConnect from "../dbConnect";
import Form from "../models/Form";

export async function updateForm(formId, formData) {
  try {
    await dbConnect();
  } catch (e) {
    throw new Error("Unable to update form at this time, please try again");
  }

  try {
    return Form.findByIdAndUpdate(formId, formData, {
      returnDocument: "after",
    });
  } catch (e) {
    throw new Error("Unable to update form");
  }
}

export async function deleteForm(formId) {
  try {
    await dbConnect();

    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      throw new Error("Invalid form ID");
    }
    return deletedForm._id;
  } catch (e) {
    throw new Error("Unable to delete form at this time, please try again");
  }
}
