import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Button,
  CardBody
} from "@material-tailwind/react";
import {
  AcademicCapIcon,
  ClockIcon,
  LanguageIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Select from "react-tailwindcss-select";

const skillLevelOptions = [
  { value: "0", label: "Beginner" },
  { value: "1", label: "Intermediate" },
  { value: "2", label: "Advanced" }
];

const durationOptions = [
  { value: "0", label: "Short (0-5 hours)" },
  { value: "1", label: "Medium (5-10 hours)" },
  { value: "2", label: "Long (10+ hours)" }
];

const languageOptions = [
  { value: "0", label: "English" },
  { value: "1", label: "Spanish" }
];

const CoursesFilterDialog = ({ open, handleFilterDialogue, tab, skillLevels, setSkillLevels, durations, setDurations, languages, setLanguages }) => {
  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleFilterDialogue}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="overflow-auto max-h-screen"
    >
      <DialogHeader className="flex justify-between items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            Apply Filter
          </Typography>
          <Typography color="gray" variant="small">
            Apply Filter on {tab} Courses
          </Typography>
        </div>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleFilterDialogue}
        >
          <XMarkIcon className="w-5 h-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody>
        <CardBody className="flex flex-col gap-6">
          <div className="mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium flex items-center"
            >
              <AcademicCapIcon className="w-5 h-5 mr-1" />
              Skill Level
            </Typography>
            <Select
              value={skillLevels}
              onChange={(val) => setSkillLevels(val)}
              options={skillLevelOptions}
              className="mb-4"
              isMultiple={true}
            />
          </div>
          <div className="mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium flex items-center"
            >
              <ClockIcon className="w-5 h-5 mr-1" />
              Duration
            </Typography>
            <Select
              value={durations}
              onChange={(val) => setDurations(val)}
              options={durationOptions}
              className="mb-4"
              isMultiple={true}
            />
          </div>
          <div className="mb-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium flex items-center"
            >
              <LanguageIcon className="w-5 h-5 mr-1" />
              Language
            </Typography>
            <Select
              value={languages}
              onChange={(val) => setLanguages(val)}
              options={languageOptions}
              className="mb-4"
              isMultiple={true}
            />
          </div>
        </CardBody>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button
          variant="text"
          color="red"
          onClick={handleFilterDialogue}
          className="mr-1"
        >
          Reset
        </Button>
        <Button variant="gradient" color="green" onClick={handleFilterDialogue}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CoursesFilterDialog;
