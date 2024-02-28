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
export default function TabSection({ defaultTab, isEdit, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  /**
   * Sets the activeTab to the one just pressed
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e The event fired
   */
  const onTabClick = (e) => {
    setActiveTab(e.target.innerText);
  };

  useEffect(() => {
    // Set default tab
    setActiveTab(defaultTab);
  }, [defaultTab]);

  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children.filter((x) => x !== undefined)

  return (
    <div>
      <div>
        <ul className="flex -mb-[0.1rem] h-10">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                key={label}
                onTabClick={onTabClick}
                activeTab={isEdit ? "information" : activeTab}
                label={label}
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
