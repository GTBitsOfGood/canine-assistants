export const ChipTypeStyles = {
  Tag: "border-neutral-chip-shade bg-neutral-chip",
  HighConcern: "border-neutral-chip-shade bg-neutral-chip",
  SomeConcern: "border-neutral-chip-shade bg-neutral-chip",
  NoConcern: "border-neutral-chip-shade bg-neutral-chip",
  MedicalConcern: "border-neutral-chip-shade bg-neutral-chip",
  Placed: "border-neutral-chip-shade bg-neutral-chip",
  Facility1: "border-neutral-chip-shade bg-neutral-chip",
  Facility2: "border-neutral-chip-shade bg-neutral-chip",
};

export default function Chip({ label, type }) {
  return (
    <>
      <div className="big-red-300 h-10 p-1 inline-flex">
        <div
          className={`px-2.5 border items-center rounded py-2 ${ChipTypeStyles[type]} flex`}
        >
          <div className="text-sm font-medium">{label}</div>
        </div>
      </div>
    </>
  );
}
