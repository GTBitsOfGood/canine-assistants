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
  return (
    <>
      <a
        href={link.length > 0 ? link : "#"}
        className={`${link.length > 0 ? "" : "cursor-default"} big-red-300 max-h-10 inline-flex ${styles}`}
      >
        <div className={`${innerStyles} px-2.5 min-w-[3.5rem] justify-center border items-center rounded py-1.5 ${type} flex text-no-wrap sm:w-max`}>
          <div className="text-xs font-medium">{label}</div>
        </div>
      </a>
    </>
  );
}
