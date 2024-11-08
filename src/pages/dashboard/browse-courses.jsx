import React, { useState, useRef, useMemo } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import coursesData from "@/data/courses-data";
import TypewriterComponent from "typewriter-effect";
import BrowseCoursesCard from "@/widgets/cards/browse-courses-card";
import CoursesFilterDialog from "@/widgets/courses/browse/courses-filter-dialogue";
import { FunnelIcon } from "@heroicons/react/24/outline";

const colorCodes = [
  "#a4e3da", "#fda88b", "#9ebef1", "#f69fd6", "#8786fb", 
  "#f88c8c", "#8cdbf9", "#bca1f2", "#8cd5ca", "#997fbc",
  "#a0d69a", "#ffbb94"
];

const BrowseCourse = () => {
  const tabsHeaderRef = useRef(null);
  const [skillLevels, setSkillLevels] = useState([]);
  const [durations, setDurations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currentFilterDialogue, setCurrentFilterDialogue] = useState('');

  const handleFilterDialogue = () => setCurrentFilterDialogue('');
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
  };

  const headerColors = useMemo(() => {
    const extendedColors = [...colorCodes];
    while (extendedColors.length < coursesData.length) {
      extendedColors.push(...colorCodes);
    }
    return extendedColors;
  }, [coursesData.length]);

  return (
    <div className="-mx-2 mt-6 mb-6 lg:mx-4">
      <Card shadow={false} className="bg-transparent">
        <CardBody className="p-0">
          <div className="flex w-100 flex-col gap-8">
            <Tabs value={coursesData[0].tab}>
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <TabsHeader ref={tabsHeaderRef} className="overflow-x-auto whitespace-nowrap">
                  {coursesData.map(({ tab, icon }) => (
                    <Tab key={tab} value={tab} onClick={(event) => handleTabClick(event, tab)}>
                      <div className="flex items-center gap-2">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        {tab}
                      </div>
                    </Tab>
                  ))}
                </TabsHeader>
              </div>
              <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
                {coursesData.map(({ tab, taglines, icon, courses }) => (
                  <TabPanel key={tab} value={tab} className="px-0 pb-6">
                    <Card shadow={false} className="bg-white">
                      <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0"
                      >
                        <div className="p-4 w-full grid gap-6 grid-cols-2">
                          <div className="typewriter-container">
                            <Typography variant="h6" className="flex items-center gap-1 font-normal text-blue-gray-600">
                              {React.createElement(icon, { strokeWidth: 3, className: "h-4 w-4 text-blue-gray-200" })}
                              <TypewriterComponent
                                options={{
                                  strings: taglines,
                                  autoStart: true,
                                  loop: true,
                                  delay: 50,
                                  cursor: "",
                                }}
                              />
                            </Typography>
                          </div>
                          <div>
                            <Tooltip
                              content="Filter"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              <IconButton className="float-right" onClick={() => setCurrentFilterDialogue(tab)} variant="text">
                                <FunnelIcon
                                  className="h-6 w-6"
                                  size="md"
                                  variant="text">
                                </FunnelIcon>
                              </IconButton>
                            </Tooltip>
                            <CoursesFilterDialog
                              open={currentFilterDialogue === tab}
                              handleFilterDialogue={handleFilterDialogue}
                              tab={tab}
                              skillLevels={skillLevels}
                              setSkillLevels={setSkillLevels}
                              durations={durations}
                              setDurations={setDurations}
                              languages={languages}
                              setLanguages={setLanguages}
                            />
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                    <div className="mt-6 mx-4 grid gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                      {courses.map((course, courseIndex) => (
                        <div key={course.id} className="flex justify-center" >
                          <BrowseCoursesCard tab={tab} course={course} headerColor={headerColors[(courseIndex) % headerColors.length]} />
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BrowseCourse;
