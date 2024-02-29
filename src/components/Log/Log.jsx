import TagDisplay from "@/components/TagDisplay";
import { useState, useEffect} from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteLogModal from "./DeleteLogModal";
import LogModal from "./ResolveLogModal";
import ResolveLogModal from "./ResolveLogModal";
import { Toast } from "../Toast";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "../Chip";
import stringUtils from "@/utils/stringutils";

export default function Log({ log, user, onEdit, onDelete }) {
  const [showMore, setShowMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const createdAt = new Date(log.createdAt);
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorName, setAuthorName] = useState("N/A");

  useEffect(() => {
    if (log.author) {
      setIsAuthor(user._id == log.author._id);
      setAuthorName(log.author.name);
    }
  });

  const tags = [
    { group: "severity", label: log.severity },
    { group: "topic", label: log.topic },
    ...log.tags.map((tag) => {
      return { group: "tag", label: tag };
    }),
  ];

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleResolveClick = () => {
    setShowResolveModal(true);
  };

  return (
    <div className="bg-primary-background p-4 my-4 w-full pb-6">

    {showEditModal ? (
        <>
          <LogModal
            userId={user._id}
            log = {log}
            dogId = {log.dog}
            onClose={() => {
              setShowEditModal(false);
            }}
            onSubmit={(success) => {
              onEdit(success)
              if (success) {
                Toast({ success: true, bold: log.title, message: "was successfully edited." });
              } else {
                Toast({ success: false, message: "There was a problem saving the log, please try again." });
              }
            }}
          />
        </>
      ) : null}

    {showDeleteModal ? 
      <DeleteLogModal
        logId={log._id}
        title = {log.title}
        onSubmit={(success) => {
          setShowDeleteModal(false);
          onDelete(true);
          if (success) {
            Toast({ success: true, bold: log.title, message: "was successfully deleted." });
          } else {
            Toast({ success: false, message: "There was a problem deleting the log, please try again." });
          }
        }}
          
        onClose={() => {
          setShowDeleteModal(false);
        }}>

      </DeleteLogModal>
      :
      <></>}

    {showResolveModal ? (
        <>
          <ResolveLogModal
            userId={user._id}
            log = {log}
            dogId = {log.dog}
            onClose={() => {
              setShowResolveModal(false);
            }}
            onSubmit={(success) => {
              onEdit(success)
              if (success) {
                Toast({ success: true, bold: log.title, message: "was successfully edited." });
              } else {
                Toast({ success: false, message: "There was a problem saving the log, please try again." });
              }
            }}
          />
        </>
      ) : null}
      
      {true && (  //Change back to isAuthor (or something idk check dev) TESTING
        <div className="flex space-between">
          <div className="flex">
          
          <div className="mx-1 text-red-600 text-xl">{user.role === "User" && !log.resolved ? "●" : "⠀"}</div>  
            <Chip
              key={"ResolvedChip"}
              label={log.resolved ? "Resolved" : "Unresolved"}
              type={`border-neutral-chip-shade bg-neutral-chip h-7 ${log.resolved ? 'bg-green-200 border-green-600' : 'bg-red-300 border-red-600'} mb-1`}
            />
          </div>
          

          <div className="grow flex gap-4 justify-end">
            <button
              type="button"
              className="flex justify-center items-center"
              onClick={handleResolveClick}
            >
              <ClipboardIcon className="h-5 mr-1" />
              {log.resolved ? "Resolved" : "Resolve"}
            </button>
            <button
              type="button"
              className="flex justify-center items-center"
              onClick={handleEditClick}
            >
              <PencilSquareIcon className="h-5 mr-1" />
              Edit
            </button>
            <button
              type="button"
              className="flex justify-center items-center"
              onClick={handleDeleteClick}
            >
              <TrashIcon className="h-5 mr-1" />
              Delete
            </button>
          </div>
        </div>
        
      )}
      <div className="flex justify-between">
        <div className="flex flex-col ml-5">
          <h2>{log.title}</h2>
          <div className="flex flex-row">
            <p className="text-secondary-text font-regular w-fit">
              {"Author: " + authorName}
            </p>
            <p className="text-secondary-text font-regular mx-5 w-fit">
              {"Date: " + createdAt.toLocaleDateString()}
            </p>
            <p className="text-secondary-text font-regular w-fit">
              {"Time: " + createdAt.toLocaleTimeString("en-US")}
            </p>
          </div>
        </div>
         <TagDisplay tags={tags} removeTag={null} />
      </div>
      {log.description.length > 250 ? (
        <div className="max-w-fit">
          <p className="pt-4 break-words">
            {showMore
              ? log.description
              : log.description.substring(0, 250) + "..."}
          </p>
          <div className="flex flex-row-reverse">
            <button
              className="font-bold"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      ) : (
        <p className="min-w-fit pt-4 break-words ml-5">{log.description}</p>
      )}
    </div>
  );
}
