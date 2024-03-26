import stringUtils from "@/utils/stringutils";

/**
 * A modular Tab used in a TabSection
 *
 * @param {{ activeTab: string, label: string, onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void}}
 * @returns
 */
export default function Tab({ activeTab, label, alertIcon, onTabClick }) {
  return (
    <li
      className={`cursor-pointer ${
        activeTab.toLowerCase() === label.toLowerCase()
          ? "border-ca-green"
          : "border-stone-50 hover:border-secondary-gray"
      } text-xl font-bold px-7 sm:px-10 border-b-4 text-primary-text hover:bg-gray-100 pt-1 flex flex-row`}
      onClick={onTabClick}
    >
      <div className="mx-1 text-red-600">{!alertIcon ? "•" : ""}</div>
      <div>{stringUtils.upperFirstLetter(label)}</div>
    </li>
  );
}
