/**
 * A modular Tab used in a TabSection
 * 
 * @param {{ activeTab: string, label: string, onTabClick: (e: React.MouseEvent<HTMLButtonElement>) => void}} 
 * @returns 
 */
export default function Tab({ activeTab, label, onTabClick }) {
    return (
        <li className={`${activeTab.toLowerCase() === label.toLowerCase() ? "border-red-300" : ""} text-sm px-7 sm:px-10 border-b-2 text-gray-400 uppercase hover:bg-gray-50`} onClick={onTabClick}>
            <a href="#">{label}</a>
        </li>
    )
}