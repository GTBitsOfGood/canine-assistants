import { useRouter } from "next/router";

export const ChipTypeStyles = {
  Tag: "border-neutral-chip-shade bg-neutral-chip",
  "High": "border-high-concern-shade bg-high-concern",
  "Moderate": "border-some-concern-shade bg-some-concern",
  "None": "border-no-concern-shade bg-no-concern",
  "Placed": "border-location-placed-shade bg-location-placed",
  "Facility": "border-facility-green-shade bg-facility-green",
  "Topic": "border-topic-yellow-shade bg-topic-yellow",
};

export function Chip({ label, type, link = "", styles, innerStyles }) {
  const router = useRouter();

  const handleClick = (event) => {
    if (link.length > 0) {
      event.preventDefault();
      event.stopPropagation()
      router.push(link);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        href="#"
        className={`${link.length > 0 ? "" : "cursor-default"} big-red-300 max-h-10 inline-flex ${styles}`}
      >
        <div className={`${innerStyles} px-2.5 min-w-[5rem] justify-center border items-center rounded py-2 ${type} flex`}>
          <div className="text-sm font-medium">{label}</div>
        </div>
      </button>
    </>
  );
}
