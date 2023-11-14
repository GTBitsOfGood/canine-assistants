import TagDisplay from "@/components/TagDisplay";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Log({ log, onDelete, onEdit }) {
  const [showMore, setShowMore] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);

  const createdAt = new Date(log.createdAt);

  const tags = [
    { group: "severity", label: log.severity },
    { group: "topic", label: log.topic },
    ...log.tags.map((tag) => {
      return { group: "tag", label: tag };
    }),
  ];

  const handleDeleteClick = () => {
    onDelete(log._id);
  };

  const handleEditClick = () => {
    onEdit(log._id);
  };

  return (
    <div className="bg-primary-background p-4 my-4 w-full">
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

      <button type="button" onClick={handleEditClick} className=" px-2 py-1.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex">
        {/* <div className="text-foreground h-4 w-4 relative"><PencilSquareIcon /></div> */}
        <div className="text-foreground text-base font-medium">Edit the log</div>
      </button>

      <button type="button" onClick={handleDeleteClick} className=" px-2 py-1.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex">
        <div className="text-foreground text-base font-medium">Delete the log</div>
      </button>

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
