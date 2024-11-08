import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Card,
  CardBody,
  Chip,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  ListBulletIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import CourseInfoCard from "@/widgets/cards/course-info-card";
import { useParams, Link, NavLink } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import coursesData from "@/data/courses-data";
import tutorialsData from "@/data/tutorials-data"; // Assume this is where your tutorial data is stored
import ReactApexChart from "react-apexcharts";

const ExploreCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 1 : value);

  const Icon = ({ id, open }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );

  useEffect(() => {
    const parsedCourseId = parseInt(courseId, 10);
    const foundCourse = coursesData
      .flatMap(tab => tab.courses)
      .find(course => course.id === parsedCourseId);
    setCourse(foundCourse);
  }, [courseId]);

  const courseDescription = useMemo(() => course?.description_long, [course]);

  if (!course) {
    return <div>Course not found</div>;
  }

  const chart = {
            series: [45],
            options: {
              chart: {
                type: 'radialBar',
                sparkline: {
                  enabled: true
                }
              },
              dataLabels: {
                enabled: false
              },
              plotOptions: {
                radialBar: {
                  startAngle: -90,
                  endAngle: 90,
                  hollow: {
                    margin: 0,
                    size: '70%'
                  },
                  track: {
                    margin: 0,
                    background: "#e7e7e7",
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      offsetY: -2,
                      fontSize: '10px'
                    }
                  }
                }
              }
            },          
          };

  return (
    <div className="-mx-2 mt-12 mb-6 lg:mx-4">
      <CourseInfoCard
        title={course.title}
        description={course.description}
        img={course.img}
        tag={course.tag}
      />
      <div className="mt-12">
        <Card>
          <CardBody className="p-4">
            <Tabs value="lessons">
              <TabsHeader className="overflow-x-auto whitespace-nowrap rounded-xl shadow-sm">
                <Tab key="description" value="description">
                  <div className="flex items-center gap-2">
                    <ChatBubbleBottomCenterIcon className="w-5 h-5" />
                    Description
                  </div>
                </Tab>
                <Tab key="lessons" value="lessons">
                  <div className="flex items-center gap-2">
                    <ListBulletIcon className="w-5 h-5" />
                    Lessons
                  </div>
                </Tab>
              </TabsHeader>

              <TabsBody animate={{ initial: { y: 250 }, mount: { y: 0 }, unmount: { y: 250 } }}>
                <TabPanel key="description" value="description" className="px-0">
                  <Typography variant="paragraph" className="flex items-center gap-1 font-normal text-blue-gray-600">
                    {courseDescription}
                  </Typography>
                </TabPanel>
                <TabPanel key="lessons" value="lessons" className="px-0">
                  <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="p-4 cursor-pointer bg-gray-100 hover:bg-gray-200">
                      <div className="flex flex-wrap items-center justify-between w-full">
                        <Typography variant="h6" className="font-semibold text-blue-gray-600">
                          Python Installations (Anaconda Navigator, Jupyter Notebook, Jupyter Lab)
                        </Typography>
                        <div className="flex items-center space-x-4">
                          <Typography variant="h6" className="font-semibold text-blue-gray-600">
                            3 lectures
                          </Typography>
                          <Typography variant="small" className="text-sm text-blue-gray-600">
                            32min
                          </Typography>
                        </div>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-full table-auto text-blue-gray-600">
                          <thead>
                            <tr>
                              <th className="py-3 px-5 text-left"></th>
                              <th className="py-3 px-5 text-left">Title</th>
                              <th className="py-3 px-5 text-left">Duration</th>
                              <th className="py-3 px-5 text-left">Category</th>
                              <th className="py-3 px-5 text-left">Published Date</th>
                              <th className="py-3 px-5 text-left">Progress</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tutorialsData.map(
                              ({ id, title, author, duration, category, publishedDate, media }, key) => {
                                const className = `py-3 px-5 ${
                                  key === tutorialsData.length - 1 ? "" : "border-b border-blue-gray-50"
                                }`;

                                return (
                                  <tr key={id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {media === "doc" && <DocumentIcon className="w-5 h-5 text-gray-400" />}
                                        {media === "video" && <VideoCameraIcon className="w-5 h-5 text-gray-400" />}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <NavLink to={`/dashboard/view-tutorial/${id}`}>
                                        <Typography variant="small" className="font-semibold text-blue-gray-600">
                                          {title}
                                        </Typography>
                                      </NavLink>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {duration}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {category}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {publishedDate}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <ReactApexChart options={chart.options} series={chart.series} type="radialBar" height={50} width={50} />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </AccordionBody>
                  </Accordion>
                  <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(2)} className="p-4 cursor-pointer bg-gray-100 hover:bg-gray-200">
                      <div className="flex flex-wrap items-center justify-between w-full">
                        <Typography variant="h6" className="font-semibold text-blue-gray-600">
                          Python Installations (Anaconda Navigator, Jupyter Notebook, Jupyter Lab)
                        </Typography>
                        <div className="flex items-center space-x-4">
                          <Typography variant="h6" className="font-semibold text-blue-gray-600">
                            3 lectures
                          </Typography>
                          <Typography variant="small" className="text-sm text-blue-gray-600">
                            32min
                          </Typography>
                        </div>
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-full table-auto text-blue-gray-600">
                          <thead>
                            <tr>
                              <th className="py-3 px-5 text-left"></th>
                              <th className="py-3 px-5 text-left">Title</th>
                              <th className="py-3 px-5 text-left">Duration</th>
                              <th className="py-3 px-5 text-left">Category</th>
                              <th className="py-3 px-5 text-left">Published Date</th>
                              <th className="py-3 px-5 text-left">Progress</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tutorialsData.map(
                              ({ id, title, author, duration, category, publishedDate, media }, key) => {
                                const className = `py-3 px-5 ${
                                  key === tutorialsData.length - 1 ? "" : "border-b border-blue-gray-50"
                                }`;

                                return (
                                  <tr key={id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {media === "doc" && <DocumentIcon className="w-5 h-5 text-gray-400" />}
                                        {media === "video" && <VideoCameraIcon className="w-5 h-5 text-gray-400" />}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <NavLink to={`/dashboard/view-tutorial/${id}`}>
                                        <Typography variant="small" className="font-semibold text-blue-gray-600">
                                          {title}
                                        </Typography>
                                      </NavLink>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {duration}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {category}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <Typography className="text-xs font-normal text-blue-gray-500">
                                        {publishedDate}
                                      </Typography>
                                    </td>
                                    <td className={className}>
                                      <ReactApexChart options={chart.options} series={chart.series} type="radialBar" height={50} width={50} />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </AccordionBody>
                  </Accordion>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ExploreCourse;
