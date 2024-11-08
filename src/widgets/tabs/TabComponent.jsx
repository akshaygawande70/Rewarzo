import React, { useRef } from 'react';
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel } from "@material-tailwind/react";
import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/solid";

const TabComponent = ({ activeTab, setActiveTab, uniqueStatuses, children }) => {
  const tabsHeaderRef = useRef(null);

  const handleTabClick = (event, tab) => {
    const tabElement = event.target.closest('[role="tab"]');
    if (tabElement) {
      const tabRect = tabElement.getBoundingClientRect();
      const tabsHeaderRect = tabsHeaderRef.current.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2;
      const tabsHeaderCenter = tabsHeaderRect.left + tabsHeaderRect.width / 2;
      const scrollOffset = tabCenter - tabsHeaderCenter;
      tabsHeaderRef.current.scrollLeft += scrollOffset;
    }
    setActiveTab(tab);
  };

  return (
    <Tabs value={activeTab}>
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <TabsHeader ref={tabsHeaderRef} className="overflow-x-auto whitespace-nowrap">
          {uniqueStatuses.map((status) => (
            <Tab key={status} value={status} onClick={(event) => handleTabClick(event, status)}>
              <div className="flex items-center gap-2">
                {status === "Active" && <CheckCircleIcon className="w-5 h-5" />}
                {status === "Inactive" && <NoSymbolIcon className="w-5 h-5" />}
                {status}
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </div>
      <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
        {children}
      </TabsBody>
    </Tabs>
  );
};

export default TabComponent;
