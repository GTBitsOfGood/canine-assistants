import Card from "@/components/Card";
import userpfpplaceholder from "../../public/userpfpplaceholder.svg";

import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { consts } from "@/utils/consts";

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

  const router = useRouter();
  // TODO: replace with session info
  const placeholderUser = "65358b82eccc98bd5877fcbb";

  useEffect(() => {
    fetch(`/api/users/${placeholderUser}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [router.query]);

  if (!data || data === undefined || !data.success) {
    return <div>loading</div>;
  }

  const user = data.data;

  return (
    <Card cardStyle="mt-16">
      {showDeactivateModal ? (
        <div>
          <div className="fixed inset-0 bg-modal-background-gray opacity-60"></div>
          <Card cardStyle="flex flex-col justify-between fixed z-10 inset-0 mt-32 mx-96 h-64">
            <h1>Deactivate {user.name}?</h1>
            <p>
              Select “Confirm” to deactivate Jane and remove all access to the
              Canine Assistants database. This action can only be undone by an
              administrator.
            </p>
            <div className="flex flex-row justify-end">
              <button
                className="flex flex-row h-full w-32 px-4 py-2 mx-4 justify-center border rounded border-primary-gray"
                onClick={() => setShowDeactivateModal(!showDeactivateModal)}
              >
                Cancel
              </button>
              <button
                className="flex flex-row h-full w-32 px-4 py-2 justify-center text-foreground bg-ca-pink border rounded border-ca-pink-shade"
                onClick={() => {
                  let body = {};
                  body.role = consts.userRoleArray[3];
                  console.log(body);
                  fetch("/api/users/" + placeholderUser, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                  })
                    .then((res) => {
                      console.log(res);
                      router.push("/login");
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Confirm
              </button>
            </div>
          </Card>
        </div>
      ) : (
        ``
      )}
      <div className="flex flex-row">
        <div className="rounded-full">
          <Image
            height={180}
            width={180}
            src={user.image || userpfpplaceholder}
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

                        fetch("/api/users/" + placeholderUser, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(body),
                        })
                          .then((res) => {
                            fetch(`/api/users/${placeholderUser}`)
                              .then((res) => res.json())
                              .then((data) => setData(data));

                            if (res.ok) {
                              toast.custom((t) => (
                                <div
                                  className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
                                  ${
                                    t.visible
                                      ? "animate-enter"
                                      : "animate-leave"
                                  }`}
                                >
                                  <span className="font-bold">
                                    Account Name
                                  </span>
                                  &nbsp;
                                  <span> was successfully updated.</span>
                                </div>
                              ));
                              setEditName(!editName);
                            } else {
                              toast.custom(() => (
                                <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                                  There was a problem updating the account name,
                                  please try again.
                                </div>
                              ));
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
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
                  <h1>{user.name}</h1>
                  <button
                    className="flex flex-row items-center"
                    onClick={() => {
                      setEditName(!editName);
                      setName(user.name);
                    }}
                  >
                    <PencilSquareIcon className="ml-4 mr-2 h-4 text-primary-text" />
                    <p className="text-secondary-text">Edit</p>
                  </button>
                </div>
              )}
              <button
                className="flex flex-row h-10 px-4 py-2 items-center bg-secondary-gray border rounded border-primary-gray"
                onClick={() => setShowDeactivateModal(!showDeactivateModal)}
              >
                <ExclamationTriangleIcon className="mr-2 h-4 text-primary-text" />
                Deactivate
              </button>
            </div>
            <p className="text-secondary-text">{user.email}</p>
          </div>

          <div>
            <h2>Role</h2>
            <p className="text-secondary-text">{user.role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
