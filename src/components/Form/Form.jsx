import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import ConfirmCancelModal from "../ConfirmCancelModal";
import FormQuestion from "./FormQuestion";
import { Toast } from "../Toast";
import LoadingAnimation from "../LoadingAnimation";

import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "@/utils/formConsts";
import { consts } from "@/utils/consts";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { formActions, formMap } from "@/utils/formUtils";
import dateutils from "@/utils/dateutils";

export default function Form({ mode }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [dog, setDog] = useState();
  const [ formData, setFormData ] = useState();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();

  let form = {};
  form.user = session?.user._id;
  form.dog = router.query.id;
  
  // Invalid query param redirect to /dogs/:id
  useEffect(() => {
    if (router.query.type && !consts.formTypeArray.includes(router.query.type)) {
      router.push(`/dogs/${router.query.id}`);
      return;
    }
    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDog(data);
      });
    }
    if (router.query.idForm) {
      fetch(`/api/forms/${router.query.idForm}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data.data);
        });
    }
  }, [ router ]);

  if (!router.query || !dog || dog === undefined || !dog.success || (mode != formActions.NEW && (!router.query || !formData || formData == undefined))) {
    return <LoadingAnimation />
  }

  const formType = formMap[router.query.type]

  let title = "";
  switch (formType) {
    case MONTHLY_PLACED_FORM:
      if (mode == formActions.NEW) {
        title = "Add a New Monthly Placed Form";
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Monthly Check-In`
      }
      form.type = consts.formTypeArray[0]
      break;
    case MONTHLY_UNPLACED_FORM:
      if (mode == formActions.NEW) {
        title = "Add a New Monthly Unplaced Form";
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Monthly Check-In (Unplaced Dog)`
      }
      form.type = consts.formTypeArray[1]
      break;
    case VOLUNTEER_FORM:
      if (mode == formActions.NEW) {
        title = "Add a New Volunteer Interaction"
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Volunteer Interaction`
      }
      form.type = consts.formTypeArray[2]
      break;
  }

  const name = dog.data.name;

  return (
    <div className="bg-foreground rounded-lg modal-shadow border border-primary-gray p-4 sm:py-12 sm:px-24 my-4 sm:my-8">
      {showCancelModal
        ? ConfirmCancelModal(
            "Discard all changes?",
            "Select “Cancel” to continue editing. Select “Confirm” to delete all of your changes. This action cannot be undone.",
            () => router.push("/dogs/" + router.query.id + "?showFormTab=true"),
            setShowCancelModal,
            showCancelModal
          )
        : ``}
      <div className="flex items-center mb-4 sm:mb-6">
        <ChevronLeftIcon className="w-4 mr-2" />
        <button
          className="text-lg text-secondary-text"
          onClick={() => {
            if (mode != formActions.VIEW) {
              setShowCancelModal(!showCancelModal);
            } else {
              router.push("/dogs/" + router.query.id + "?showFormTab=true");
            }
          }}
        >
          Return to {name}
        </button>
      </div>
      {mode != formActions.NEW ? (
        <div>
          <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 text-base text-primary-text font-normal mb-4 sm:mb-6">
            <span>Created by: {formData.user.name}</span>
            <span>Last Updated: {dateutils.displayDateAndTime(formData.updatedAt)}</span>
          </div>
        </div>
      ) : null}
      <h1 className="text-primary-text mb-6 text-3xl">{title}</h1>
      <div className="flex flex-col w-full">
        <form
          onSubmit={handleSubmit((data) => {
            form.responses = Object.values(data).map((response) => {
              return { answer: response ? response : "" };
            });
            fetch("/api/forms", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
            }).then((res) => {
              if (res.ok) {
                Toast({ success: true, bold: "New Form", message: "was successfully added." });
                router.push("/dogs/" + router.query.id + "?showFormTab=true");
              } else {
                Toast({ success: false, message: "There was a problem submitting the form, please try again." });
              }
            });
          })}
        >
          {formType.map((e, index) => {
              if (mode != formActions.NEW) {
                e = { ...formData.responses[index], ...e }
              }
              return FormQuestion(e, index + 1, register, errors, mode);
            })
          }
          {mode == formActions.VIEW ? (
            ``
          ) : (
            <div className="flex flex-row justify-end mt-8 sm:mt-14 mb-6">
              <button
                className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray bg-foreground text-primary-text text-base font-medium"
                onClick={() => setShowCancelModal(!showCancelModal)}
              >
                Cancel
              </button>
              <input
                className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade text-base font-medium"
                type="submit"
                value="Save Form"
                onClick={() => {
                  Object.keys(errors).length === 0
                    ? ``
                    : Toast({ success: false, message: "Please make sure to complete all fields before submitting." });
                }}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
