import TagDisplay from "@/components/TagDisplay";
import { useState, useEffect} from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteLogModal from "./DeleteLogModal";
import LogModal from "./ResolveLogModal";
import ResolveLogModal from "./ResolveLogModal";
import { Toast } from "../Toast";
import RecentTags from "../RecentTags";

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
    <div className="bg-primary-background p-4 my-4 w-full">

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
      
      {true &&(
        <div className="grow flex gap-4 justify-end">
          <button
            type="button"
            className="flex justify-center items-center"
            onClick={handleResolveClick}
          >
            <ClipboardIcon className="h-5 mr-1" />
            Resolve {log.resolved ? "d" : ""}
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
      )}
      <div className="flex justify-between">
        <div className="flex flex-col">
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
        <RecentTags tags={tags} />
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
              type="button"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      ) : (
        <p className="min-w-fit pt-4 break-words">{log.description}</p>
      )}
    </div>
  );
}
