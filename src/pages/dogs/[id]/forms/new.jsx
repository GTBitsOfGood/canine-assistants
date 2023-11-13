import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ConfirmCancelModal from "@/components/ConfirmCancelModal";
import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "@/utils/formConsts";
import { consts } from "@/utils/consts";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function NewForm() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [dog, setDog] = useState();

  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();

  let form = {};
  form.user = session?.user._id;
  form.dog = router.query.id;

  let formType = VOLUNTEER_FORM;
  let title = "Add a New Volunteer Interaction Form";
  form.type = consts.formTypeArray[2];
  if (router.query.type == "monthlyPlacedForm") {
    formType = MONTHLY_PLACED_FORM;
    title = "Add a New Monthly Placed Form";
    form.type = consts.formTypeArray[1];
  } else if (router.query.type == "monthlyUnplacedForm") {
    formType = MONTHLY_UNPLACED_FORM;
    title = "Add a New Monthly Unplaced Form";
    form.type = consts.formTypeArray[0];
  }

  useEffect(() => {
    fetch(`/api/dogs/${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDog(data);
      });
  }, [router.query]);

  if (!dog || dog === undefined || !dog.success) {
    return <div>loading</div>;
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
            })
              .then((res) => {
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
                      There was a problem adding the log, please try again.
                    </div>
                  ));
                  console.log(res);
                }
              })
              .catch((err) => {});
          })}
        >
          {formType.map((e, index) => {
            return question(e, index + 1);
          })}
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
            />
          </div>
        </form>
      </div>
    </div>
  );

  function question(formObj, index) {
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
          <textarea
            className={`min-w-96 w-1/2 h-72 pl-2 border rounded text-primary-text border-primary-gray mb-4`}
            placeholder={
              formObj.question == "(place for notes)"
                ? "Additional notes go here..."
                : ""
            }
            {...register(`${index}`, {
              required: formObj.question !== "(place for notes)",
            })}
          />
        ) : (
          <div className="flex flex-row mb-4">
            {formObj.choices.map((choice) => {
              return (
                <label key={formObj.question + ": " + choice} className="mr-4">
                  <input
                    type="radio"
                    {...register(`${index}`, { required: true })}
                    value={choice}
                    className="checked:bg-ca-pink text-ca-pink checked:outline-ca-pink"
                  />
                  {" " + choice}
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
