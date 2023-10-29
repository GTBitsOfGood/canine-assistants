import stringUtils from "@/utils/stringutils";

/**
 * A modular Tab used in a TabSection
 *
 * @param {{ activeTab: string, label: string, onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void}}
 * @returns
 */
export default function Tab({ activeTab, label, onTabClick }) {
  return (
    <li
      className={`${
        activeTab.toLowerCase() === label.toLowerCase()
          ? "border-primary-gray"
          : ""
      } text-xl font-bold px-7 sm:px-10 border-b-4 text-primary-text hover:bg-gray-100`}
      onClick={onTabClick}
    >
      <a href="#">{stringUtils.upperFirstLetter(label)}</a>
    </li>
  );
}
