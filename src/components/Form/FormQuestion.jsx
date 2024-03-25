import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { formActions } from "@/utils/formUtils";

export default function FormQuestion(formObj, index, register, errors, mode) {
  return (
    <div
      className={`flex flex-col mb-7 bg-secondary-gray py-4 px-12
        ${formObj.questionNumber == 0 ?
          " border-x border-x-primary-gray border-b border-b-primary-gray rounded-b-lg form-bottom-shadow -mt-10 pt-6"
        : " rounded-lg border border-primary-gray modal-shadow"}
      `}
      key={formObj.question}
    >
      {formObj.question == "(place for notes)" ? (
        ``
      ) : (
        <p className="text-xl font-normal mb-2.5 pr-4 text-primary-text">
          {formObj.questionNumber != 0 ? `${formObj.questionNumber}. ` : ""}
          {formObj.question}
          {formObj.required && mode != formActions.VIEW ? <span className="text-error-red">*</span> : ""}
        </p>
      )}
      {formObj.choices.length == 0 ? (
        <div className="mb-4">
          <textarea
            disabled={mode == formActions.VIEW}
            className={`flex min-w-96 w-full lg:w-3/4 textbox-base text-area ${
              errors[index]
                ? `border-2 border-error-red`
                : `border border-primary-gray`
            } ${mode == formActions.VIEW ? "resize-none" : ""}`}
            placeholder={
              mode == formActions.VIEW
              ? formObj.answer
              : "Additional notes go here..."
            }
            {...register(`${index}`, {
              required: formObj.required,
            })}
          />
          {errors[index] && (
            <div className="flex flex-row items-center text-error-red">
              <ExclamationCircleIcon className="mr-2 h-4" />Please respond to this question
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <div className="flex flex-row ml-2">
            {formObj.choices.map((choice) => {
              return (
                <label key={formObj.question + ": " + choice} className="mr-4 text-lg font-normal">
                  <input
                    disabled={mode == formActions.VIEW}
                    type="radio"
                    {...register(`${index}`, { required: formObj.required })}
                    value={choice}
                    checked={mode == formActions.VIEW ? choice == formObj.answer : undefined}
                    className={`mr-1 ${ errors[index] ?  "!outline-error-red !border-error-red !ring-0" : "" }`}
                  />
                  {" " + choice}
                </label>
              );
            })}
          </div>
          {errors[index] && (
            <div className="flex flex-row items-center text-primary-text text-lg font-normal mt-1">
              <ExclamationCircleIcon className="mr-2 h-5" />Please select an answer choice
            </div>
          )}
        </div>
      )}
    </div>
  );
}
