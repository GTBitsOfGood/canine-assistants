import stringUtils from "@/utils/stringutils";
import UnresolvedDot from "../Log/UnresolvedDot";

/**
 * A modular Tab used in a TabSection
 *
 * @param {{ activeTab: string, label: string, onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void}}
 * @returns
 */
export default function Tab({ role, activeTab, label, alertIcon, onTabClick }) {
  return (
    <li
      className={`cursor-pointer ${
        activeTab.toLowerCase() === label.toLowerCase()
          ? "border-ca-green"
          : "border-stone-50 hover:border-secondary-gray"
      } text-xl font-bold px-7 sm:px-10 border-b-4 text-primary-text hover:bg-gray-100 pt-1`}
      onClick={onTabClick}
    >
      <div className="flex flex-row">
        {(role === "Manager" && alertIcon) && <UnresolvedDot tooltip={false}/>}
        <div>{stringUtils.upperFirstLetter(label)}</div>
      </div>
      
    </li>
  );
}
