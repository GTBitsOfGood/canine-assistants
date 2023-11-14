import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { formActions } from "@/utils/formUtils";
export default function FormQuestion(formObj, index, register, errors, mode) {
  return (
    <div className="flex flex-col" key={formObj.question}>
      {formObj.question == "(place for notes)" ? (
        ``
      ) : (
        <p>
          {index}. {formObj.question}
        </p>
      )}
      {formObj.choices.length == 0 ? (
        <div className="mb-4">
          <textarea
            disabled={mode == formActions.VIEW}
            className={`min-w-96 w-1/2 h-72 pl-2 rounded text-primary-text${
              errors[index]
                ? `border-2 border-error-red`
                : `border border-primary-gray`
            }`}
            placeholder={
              mode == formActions.VIEW
              ? formObj.answer
              : "Additional notes go here..."
            }
            {...register(`${index}`, {
              required: formObj.question !== "(place for notes)",
            })}
          />
          {errors[index] && (
            <div className="flex flex-row items-center text-error-red">
              <ExclamationCircleIcon className="mr-2 h-4" /> Please enter valid
              text
            </div>
          )}
        </div>
      ) : (
        <div className=" mb-4">
          <div className="flex flex-row">
            {formObj.choices.map((choice) => {
              return (
                <label key={formObj.question + ": " + choice} className="mr-4">
                  <input
                    disabled={mode == formActions.VIEW}
                    type="radio"
                    {...register(`${index}`, { required: true })}
                    value={choice}
                    checked={mode == formActions.VIEW ? choice == formObj.answer : undefined}
                    className={`text-ca-pink focus:ring-ca-pink disabled:text-secondary-text
                    ${
                      errors[index]
                        ? `border-2 outline-error-red border-error-red focus:ring-error-red`
                        : `focus:ring-ca-pink`
                    }`}
                  />
                  {" " + choice}
                </label>
              );
            })}
          </div>
          {errors[index] && (
            <div className="flex flex-row items-center text-error-red">
              <ExclamationCircleIcon className="mr-2 h-4" /> Please select an
              answer choice
            </div>
          )}
        </div>
      )}
    </div>
  );
}
