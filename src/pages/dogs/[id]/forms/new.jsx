import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ConfirmCancelModal from "@/components/ConfirmCancelModal";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  MONTHLY_PLACED_FORM,
  MONTHLY_UNPLACED_FORM,
  VOLUNTEER_FORM,
} from "@/utils/formConsts";

export default function NewForm() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [dog, setDog] = useState();
  const router = useRouter();

  let formType = VOLUNTEER_FORM;
  let title = "Add a New Volunteer Interaction Form";
  if (router.query.type == "monthlyPlacedForm") {
    formType = MONTHLY_PLACED_FORM;
    title = "Add a New Monthly Placed Form";
  } else if (router.query.type == "monthlyUnplacedForm") {
    formType = MONTHLY_UNPLACED_FORM;
    title = "Add a New Monthly Unplaced Form";
  }

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setDog(data);
        });
    }
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
        {formType.map((e, index) => {
          return question(e, index + 1);
        })}
      </div>
      <div className="flex flex-row justify-end my-14">
        <button
          className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray"
          onClick={() => setShowCancelModal(!showCancelModal)}
        >
          Cancel
        </button>
        <button
          className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade"
          onClick={() => confirm()}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function confirm() {
  console.log("todo");
}

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
        />
      ) : (
        <div className="flex flex-row mb-4">
          {formObj.choices.map((choice) => {
            return (
              <label key={formObj.question + ": " + choice} className="mr-4">
                <input
                  type="radio"
                  name={formObj.question}
                  value={formObj.question + " - " + choice}
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
