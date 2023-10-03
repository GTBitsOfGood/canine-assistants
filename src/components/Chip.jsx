import { useRouter } from "next/router";

export const ChipTypeStyles = {
  Tag: "border-neutral-chip-shade bg-neutral-chip",
  "High concern": "border-high-concern-shade bg-high-concern",
  "Some concern": "border-some-concern-shade bg-some-concern",
  "No concern": "border-no-concern-shade bg-no-concern",
  Placed: "border-location-placed-shade bg-location-placed",
  Facility: "border-facility-green-shade bg-facility-green",
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
        className={`${link.length > 0 ? "" : "cursor-default"} big-red-300 h-10 inline-flex`}
      >
        <div className={`px-2.5 border items-center rounded py-2 ${type} flex`}>
          <div className="text-sm font-medium">{label}</div>
        </div>
      </button>
    </>
  );
}
