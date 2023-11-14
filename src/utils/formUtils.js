import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "./formConsts";

/**
 * Maps each form type to the form
 */
const formMap = {
  MonthlyPlaced: MONTHLY_PLACED_FORM,
  MonthlyUnplaced: MONTHLY_UNPLACED_FORM,
  VolunteerInteraction: VOLUNTEER_FORM,
};

const formActions = {
  NEW: "New",
  EDIT: "Edit",
  VIEW: "View",
};

/**
 * Maps each form type to a user-readable title string
 */
const formTitleMap = {
  MonthlyPlaced: "Monthly Check-In",
  MonthlyUnplaced: "Monthly Check-In (Unplaced)",
  VolunteerInteraction: "Volunteer Interaction",
};

/**
 * Validates each array element in the responses array
 * @param {string} type Type of form, should be one of consts.formTypeArray options
 * @param {string[]} responses Array of objects with key of "answer" and value of the string response
 * @returns Object { success: Boolean, message: String | undefined }
 */
const validateForm = (type, responses) => {
  const formTemplate = formMap[type];

  if (responses.length != formTemplate.length) {
    return {
      success: false,
      message: `The responses array is not the correct length. Expected length to be ${formTemplate.length}, was ${responses.length}`,
    };
  }

  for (let i = 0; i < responses.length; i++) {
    let choicesArray = formTemplate[i]["choices"];
    if (choicesArray.length) {
      if (!choicesArray.includes(responses[i]["answer"])) {
        return {
          success: false,
          message: `Array element invalid at index ${i}. Expected one of [
            ${choicesArray.join(", ")}], was ${responses[i]["answer"]}`,
        };
      }
    }
  }

  return { success: true };
};

export { validateForm, formMap, formActions, formTitleMap };
