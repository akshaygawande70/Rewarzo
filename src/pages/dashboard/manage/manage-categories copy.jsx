import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Button,
  Input,
} from "@material-tailwind/react";
import { categoriesData } from "@/data";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/solid";

const ManageCategories = () => {
  const tabsHeaderRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");

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

  const uniqueStatuses = [...new Set(categoriesData.map(({ status }) => status)), "All"];

  const filteredCategories = categoriesData.filter((category) => {
    const matchesStatus = activeTab === "All" || category.status === activeTab;
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="-mx-2 mt-6 mb-6 lg:mx-4">
      <Card shadow={false} className="bg-transparent">
        <CardBody className="p-0">
          <div className="mb-0 p-4 flex gap-4 justify-between items-center bg-white rounded-t-xl shadow-sm">
            <Input
              type="text"
              label="Search Categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button
              size="sm"
              ripple={true}
              className="flex items-center gap-3 border border-blue-gray-600 min-w-min"
              aria-label="Add New Category"
            >
              <PlusIcon className="w-5 h-5" />
              New
            </Button>
          </div>
          <div className="flex w-full flex-col gap-8">
            <Tabs value={activeTab}>
              <div className="bg-white p-3 rounded-b-xl shadow-sm">
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
                <TabPanel key={activeTab} value={activeTab} className="px-0 pb-6">
                  <div className="mt-4 mx-4 grid gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    Hello
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageCategories;
