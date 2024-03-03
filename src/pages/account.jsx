import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import Card from "@/components/Card";
import ConfirmCancelModal from "@/components/ConfirmCancelModal";
import userpfpplaceholder from "../../public/userpfpplaceholder.svg";
import { Toast } from "@/components/Toast";

/**
 * User account management page
 *
 * @returns {React.ReactElement} The user account management page
 */
export default function Account() {
  const [data, setData] = useState();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const { data: session, update } = useSession();

  const router = useRouter();

  if (!session || !session.user) {
    return <div>loading</div>;
  }

  return (
    <Card cardStyle="mt-16 min-w-fit">
      {showDeactivateModal
        ? ConfirmCancelModal(
            "Deactivate " + session.user.name + "?",
            `Select “Confirm” to deactivate ` +
              session.user.name +
              ` and remove all access to
            the Canine Assistants database. This action can only be undone by an
            administrator.`,
            () => deactivateModal(),
            setShowDeactivateModal,
            showDeactivateModal
          )
        : ``}
      <div className="flex flex-row min-w-fit">
        <div className="rounded-full">
          <Image
            height={180}
            width={180}
            src={session.user.image || userpfpplaceholder}
            alt="User Placeholder"
          />
        </div>
        <div className="flex flex-col justify-between w-full ml-8">
          <div>
            <div className="flex flex-row justify-between w-full">
              {editName ? (
                <div>
                  <div className="flex flex-row items-center h-10">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`h-full w-72 pl-2 border rounded text-primary-text ${
                        name.trim() === ""
                          ? "focus:outline-error-red border-error-red"
                          : "border-primary-gray"
                      }`}
                    />
                    <button
                      className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray"
                      onClick={() => setEditName(!editName)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade"
                      onClick={() => {
                        let body = {};
                        body.name = name;

                        fetch("/api/users/" + session.user._id, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
                        })
                          .then(async (res) => {
                            res = await res.json();
                            update()

                            if (res.success) {
                              Toast({ success: true, bold: name, message: "was successfully updated." });
                              setEditName(!editName);
                            } else {
                              Toast({ success: false, message: "There was a problem updating the account name, please try again." });
                            }
                          })
                          .catch((err) => {});
                      }}
                    >
                      Save
                    </button>
                  </div>
                  {name.trim() === "" ? (
                    <div className="flex flex-row items-center">
                      <ExclamationCircleIcon className="mr-2 h-4 text-primary-text" />{" "}
                      Please enter a valid name
                    </div>
                  ) : (
                    ``
                  )}
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <h1>{session.user.name}</h1>
                  <button
                    className="flex flex-row items-center"
                    onClick={() => {
                      setEditName(!editName);
                      setName(session.user.name);
                    }}
                  >
                    <PencilSquareIcon className="ml-4 mr-2 h-4 text-primary-text" />
                    <p className="text-secondary-text">Edit</p>
                  </button>
                </div>
              )}
              <button
                className="flex flex-row h-10 px-4 py-2 mx-4 items-center bg-secondary-gray border rounded border-primary-gray"
                onClick={() => setShowDeactivateModal(!showDeactivateModal)}
              >
                <ExclamationTriangleIcon className="mr-2 h-4 text-primary-text" />
                Deactivate
              </button>
            </div>
            <p className="text-secondary-text">{session.user.email}</p>
          </div>

          <div>
            <h2>Role</h2>
            <p className="text-secondary-text">{session.user.role}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  function deactivateModal() {
    let body = {
      isActive: false,
    };
    fetch("/api/users/" + userId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {});
  }
}
