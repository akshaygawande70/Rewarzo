import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Chip,
  Progress,
} from "@material-tailwind/react";
import { AcademicCapIcon, CalendarDaysIcon, ClockIcon, HeartIcon, ListBulletIcon, PlayIcon, PlusIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";  
import { NavLink } from "react-router-dom";

export function CourseInfoCard({ title, description, img, tag }) {
  const backgroundImage = "/img/minimalism-abstract-digital-art-lines-wallpaper.jpg";
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden p-2 relative" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <CardBody className="p-2 relative flex flex-col rounded-lg" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="relative flex flex-col justify-between p-8 text-white w-full lg:w-2/5">
            <div>
              <div className="flex items-center mb-2">
                <motion.img
                  src={img}
                  alt={title}
                  className="object-cover rounded-xl w-12 h-12 mr-4 bg-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                />
                <Typography variant="h4" className="font-semibold mb-1"> {title}</Typography>
              </div>
              <div className="h-56">
                {description && <Typography variant="small" className="font-normal mb-2">{description}</Typography>}
                <div className="py-4">
                  <Typography variant="small" className="font-normal text-xs">Tags:</Typography>
                  <div className="flex flex-wrap items-center gap-1">
                    {tag.split(' ').map(tagVal => {
                      return  <NavLink key={tagVal} to={`/dashboard/tags/${tagVal}`}>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5 }}>
                                    <Chip value={tagVal} className="bg-gray-700 text-white"></Chip>
                                </motion.div>
                              </NavLink>
                    })}
                  </div>
                </div>
                <div className="p-4 bg-blue-gray-800 rounded-xl">
                  <Typography variant="small" className="font-normal text-xs">Progress: 50%</Typography>
                  <Progress size="sm" color="indigo" value={50} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
                <AcademicCapIcon className="w-4 h-4 mr-1 text-gray-200" />
                <Typography variant="small" className="font-normal text-xs">3 Modules</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}>
                <ListBulletIcon className="w-4 h-4 mr-1 text-gray-200" />
                <Typography variant="small" className="font-normal text-xs">15 Lessons</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}>
                <ClockIcon className="w-4 h-4 mr-1 text-gray-200" />
                <Typography variant="small" className="font-normal text-xs">3hrs 30min</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1 }}>
                <CalendarDaysIcon className="w-4 h-4 mr-1 text-gray-200" />
                <Typography variant="small" className="font-normal text-xs">22 Feb, 2024</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3 }}>
                <AcademicCapIcon className="w-4 h-4 mr-1 text-gray-200" />
                <Typography variant="small" className="font-normal text-xs">Expert</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}>
                <StarIcon className="w-4 h-4 mr-1 text-orange-300"></StarIcon>
                <Typography variant="small" className="font-normal text-xs">3/5</Typography>
              </motion.div>
              <motion.div className="flex items-center bg-blue-gray-800 p-2 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.7 }}>
                <HeartIcon className="w-4 h-4 text-red-500" />
                <Typography variant="small" className="font-normal text-xs">{20}</Typography>
              </motion.div>
            </div>
            <div className="flex gap-2 pt-10">
              <Button size="sm" ripple="light" color="white" className="flex items-center gap-3 border border-blue-gray-600">
                <PlayIcon className="w-5 h-5"></PlayIcon>
                Start
              </Button>
              <Button size="sm" ripple="light" className="flex items-center gap-3 border border-blue-gray-600">
                <PlusIcon className="w-5 h-5"></PlusIcon>
                My Library
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

CourseInfoCard.defaultProps = {
  description: null,
};

CourseInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  img: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
};

CourseInfoCard.displayName = "/src/widgets/cards/course-info-card.jsx";

export default CourseInfoCard;
