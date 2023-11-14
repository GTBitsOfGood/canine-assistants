import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ConfirmCancelModal from "./ConfirmCancelModal";
import FormQuestion from "./FormQuestion";
import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "@/utils/formConsts";
import { consts } from "@/utils/consts";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { formActions, formMap } from "@/utils/formUtils";
import dateutils from "@/utils/dateutils";

export default function Form(mode) {
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
  // form.user = "6547fbf9a457aba3856d2bbf";
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

  if (!router.query || !dog || dog === undefined || !dog.success || (mode != "New" && (!router.query || !formData || formData == undefined))) {
    return <div>loading</div>;
  }

  const formType = formMap[router.query.type]

  let title = "";
  switch (formType) {
    case MONTHLY_PLACED_FORM:
      if (mode == "New") {
        title = "Add a New Monthly Placed Form";
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Monthly Check-In`
      }
      form.type = consts.formTypeArray[0]
      break;
    case MONTHLY_UNPLACED_FORM:
      if (mode == "New") {
        title = "Add a New Monthly Unplaced Form";
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Monthly Check-In (Unplaced Dog)`
      }
      form.type = consts.formTypeArray[1]
      break;
    case VOLUNTEER_FORM:
      if (mode == "New") {
        title = "Add a New Volunteer Interaction"
      } else {
        title = `${dateutils.displayDate(formData.createdAt)} Volunteer Interaction`
      }
      form.type = consts.formTypeArray[2]
      break;
  }

  const name = dog.data.name;

  return (
    <div>
      {showCancelModal
        ? ConfirmCancelModal(
            "Discard all changes?",
            "Select “Cancel” to continue editing. Select “Confirm” to delete all of your changes. This action cannot be undone.",
            () => router.push("/dogs/" + router.query.id),
            setShowCancelModal,
            showCancelModal
          )
        : ``}
      <div className="py-6 flex items-center">
        <ChevronLeftIcon className="w-4 mr-2" />
        <Link href="/dogs" className="text-lg text-secondary-text">
          Return to {name}
        </Link>
      </div>
      <h1 className="mb-6">{title}</h1>
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit((data) => {
            form.responses = Object.values(data).map((response) => {
              return { answer: response };
            });
            fetch("/api/forms", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
            }).then((res) => {
              if (res.ok) {
                toast.custom((t) => (
                  <div
                    className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
                      ${t.visible ? "animate-enter" : "animate-leave"}`}
                  >
                    <span className="font-bold">New Form</span>
                    &nbsp;
                    <span> was successfully added.</span>
                  </div>
                ));
                router.push("/dogs/" + router.query.id);
              } else {
                toast.custom(() => (
                  <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                    There was a problem adding the form, please try again.
                  </div>
                ));
              }
            });
          })}
        >
          {formType.map((e, index) => {
              if (mode != "New") {
                e = { ...formData.responses[index], ...e }
              }
              return FormQuestion(e, index + 1, register, errors, mode);
            })
          }
          {mode == formActions.VIEW ? (
            ``
          ) : (
            <div className="flex flex-row justify-end my-14">
              <button
                className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray"
                onClick={() => setShowCancelModal(!showCancelModal)}
              >
                Cancel
              </button>
              <input
                className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade"
                type="submit"
                value="Save Form"
                onClick={() => {
                  Object.keys(errors).length === 0
                    ? ``
                    : toast.custom(() => (
                        <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                          Please make sure to complete all fields before
                          submitting.
                        </div>
                      ));
                }}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
