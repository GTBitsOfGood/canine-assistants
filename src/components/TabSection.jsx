import { useEffect, useState } from "react";
import Tab from "./Tab";

export default function TabSection({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState("");

  const onTabClick = (e) => {
    setActiveTab(e.target.innerText);
  };

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="mt-10">
      <div>
        <ul className="flex -mb-[0.1rem]">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                key={label}
                onTabClick={onTabClick}
                activeTab={activeTab}
                label={label}
              />
            );
          })}
        </ul>

        <div>
          {children.map((child) => {
            if (child.props.label.toLowerCase() !== activeTab.toLowerCase())
              return undefined;

            return child.props.children;
          })}
        </div>
      </div>
    </div>
  );
}
