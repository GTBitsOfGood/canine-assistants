export const ChipTypeStyles = {
  Tag: "border-neutral-chip-shade bg-neutral-chip",
  HighConcern: "border-high-concern-shade bg-high-concern",
  SomeConcern: "border-some-concern-shade bg-some-concern",
  NoConcern: "border-no-concern-shade bg-no-concern",
  Placed: "border-location-placed-shade bg-location-placed",
  Facility: "border-facility-green-shade bg-facility-green",
};

export default function Chip({ label, type }) {
    

  return (
    <>
      <div className="big-red-300 h-10 p-1 inline-flex">
        <div
          className={`px-2.5 border items-center rounded py-2 ${type} flex`}
        >
          <div className="text-sm font-medium">{label}</div>
        </div>
      </div>
    </>
  );
}
