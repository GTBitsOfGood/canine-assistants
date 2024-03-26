import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import Card from "@/components/Card";
import userpfpplaceholder from "../../public/userpfpplaceholder.svg";
import { Toast } from "@/components/Toast";

/**
 * User account management page
 *
 * @returns {React.ReactElement} The user account management page
 */
export default function Account() {
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session) {
      setName(session.user.name);
    }
  }, [session])
  if (!session || !session.user) {
    return <div>loading</div>;
  }

  return (
    <Card cardStyle="mt-16 min-w-fit">
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
                            

                            if (res.success) {
                              update({name: name})
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

}
