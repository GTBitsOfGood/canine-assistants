import { useRouter } from "next/router";

export const ChipTypeStyles = {
  Tag: "border-neutral-chip-shade bg-neutral-chip",
  "High Concern": "border-high-concern-shade bg-high-concern",
  "Some Concern": "border-some-concern-shade bg-some-concern",
  "No Concern": "border-no-concern-shade bg-no-concern",
  Placed: "border-location-placed-shade bg-location-placed",
  Facility: "border-facility-green-shade bg-facility-green",
  Topic: "border-topic-shade bg-topic",
};

export function Chip({ label, type, link = "" }) {
  const router = useRouter();

  const handleClick = (event) => {
    if (link.length > 0) {
      event.preventDefault();
      router.push(link);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        href="#"
        className={`${link.length > 0 ? "" : "cursor-default"} big-red-300 max-h-10 inline-flex`}
      >
        <div className={`px-2.5 border items-center rounded py-2 ${type} flex`}>
          <div className="text-sm font-medium">{label}</div>
        </div>
      </button>
    </>
  );
}
