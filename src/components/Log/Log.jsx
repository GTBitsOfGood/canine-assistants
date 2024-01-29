import TagDisplay from "@/components/TagDisplay";
import { useState, useEffect} from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteLogModal from "./DeleteLogModal";
import toast from "react-hot-toast";



export default function Log({ log }) {
  const [showMore, setShowMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const createdAt = new Date(log.createdAt);

  const tags = [
    { group: "severity", label: log.severity },
    { group: "topic", label: log.topic },
    ...log.tags.map((tag) => {
      return { group: "tag", label: tag };
    }),
  ];

  useEffect(() => {
    if (isDeleted && showToast) {
      toast.custom((t) => (
        <div
          className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
          ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
          <span className="font-bold">{log.title}</span>&nbsp;
          <span>was successfully deleted</span>
        </div>
      ));
      setShowToast(false); 
    }
  }, [isDeleted, showToast]);
  

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  if (isDeleted) {
   return null;
  }
  

  return (
    <div className="bg-primary-background p-4 my-4 w-full">

  {showDeleteModal ? 
        
          <DeleteLogModal
            logId={log._id}
            title = {log.title}
            onSubmit={() => {
              setShowDeleteModal(false);
              setIsDeleted(true);
              
            }}
            onClose={() => {
              setShowDeleteModal(false);
            }}>

          </DeleteLogModal>
          :
          <></>}

            <div className="grow flex gap-4 justify-end">
        <button
          type="button"
          className="flex justify-center space-x-2 h-min"
          // onClick={}
        >
          <PencilSquareIcon className="h-5" />
          Edit
        </button>
        <button
          type="button"
          className="flex justify-center space-x-2"
          onClick={handleDeleteClick}
        >
          <TrashIcon className="h-5" />
          Delete
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2>{log.title}</h2>
          <div className="flex flex-row">
            <p className="text-secondary-text font-regular w-fit">
              {"Author: " + log.author.name}
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
        <p className="min-w-fit pt-4 break-words">{log.description}</p>
      )}
    </div>
  );
}
