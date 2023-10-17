import TagDisplay from "@/components/TagDisplay";

export default function Log({ log }) {
  // TODO: show more stuff
  const createdAt = new Date(log.createdAt);

  const tags = [
    { group: "severity", label: log.severity },
    { group: "topic", label: log.topic },
    ...log.tags.map((tag) => {
      return { group: "tag", label: tag };
    }),
  ];

  return (
    <div className="bg-primary-background p-4 my-4">
      <div className="">
        <div className="flex justify-between">
          <h2>{log.title}</h2>
          <TagDisplay tags={tags} removeTag={null} />
        </div>
        <div className="flex flex-row">
          <p className="text-secondary-text font-regular w-fit">
            {"Author: " + log.author}
          </p>
          <p className="text-secondary-text font-regular mx-5 w-fit">
            {"Date: " + createdAt.toLocaleDateString()}
          </p>
          <p className="text-secondary-text font-regular w-fit">
            {"Time: " + createdAt.toLocaleTimeString("en-US")}
          </p>
        </div>
      </div>
      <p className="pt-4">{log.description}</p>
    </div>
  );
}
