import { useRouter } from "next/router";

import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "@/utils/formConsts";

export default function IndividualDogPage() {
  const router = useRouter();

  // TODO: update based on button functionality
  let formType = VOLUNTEER_FORM;
  if (router.query.type == "monthlyPlacedForm") {
    formType = MONTHLY_PLACED_FORM;
  } else if ((router.query.type = "monthlyUnplacedForm")) {
    formType = MONTHLY_UNPLACED_FORM;
  }

  return (
    <div className="flex flex-col">
      {formType.map((e, index) => {
        return question(e, index + 1);
      })}
    </div>
  );
}

function question(formObj, index) {
  return (
    <div className="flex flex-col" key={formObj.question}>
      <p>
        {index}. {formObj.question}
      </p>
      {formObj.choices.length == 0 ? (
        <input
          type="text"
          className={`h-full w-72 pl-2 border rounded text-primary-text "border-primary-gray"`}
        />
      ) : (
        <div className="flex flex-row">
          {formObj.choices.map((choice) => {
            return (
              <label key={formObj.question + "_" + formObj.choice}>
                <input type="radio" id={choice} name={choice} value={choice} />
                {" " + choice}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
