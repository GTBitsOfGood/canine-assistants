import { useEffect, useState } from "react";
import Tab from "./Tab";

/**
 * A component representing a series of tabs of content that can be switched; keeps track of active tab
 *
 * - defaultTab: The ID of the tab to be selected by default
 *
 * @param {{ defaultTab: string, children: ReactNode }}
 * @returns
 */
export default function TabSection({ role, defaultTab, isEdit, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  /**
   * Sets the activeTab to the one just pressed
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e The event fired
   */
  const onTabClick = (e) => {
    const tabLabel = e.target.textContent
    setActiveTab(tabLabel.includes("●") ? "Logs" : tabLabel)  //excludes "●" if it exists
  };

  useEffect(() => {
    // Set default tab
    setActiveTab(defaultTab);
  }, [defaultTab]);

  if (!Array.isArray(children)) {
    children = [children];
  }

  return (
    <div>
      <div>
        <ul className="flex -mb-[0.1rem] h-10 drop-shadow-md	">
          {children.map((child) => {
            const { label, alertIcon } = child.props;

            return (
              <Tab
                role={role}
                key={label}
                onTabClick={onTabClick}
                activeTab={isEdit ? "information" : activeTab}
                label={label}
                alertIcon={alertIcon}
              />
            );
          })}
          <li className="w-full border-b-4 border-stone-50"></li>
        </ul>

        <div className="pt-4">
          {children.map((child) => {
            if (child.props.label.toLowerCase() !== activeTab.toLowerCase() && children.length !== 1)
              return undefined;

            return child.props.children;
          })}
        </div>
      </div>
    </div>
  );
}
