import React from 'react';
import { Badge, Button, Card, CardBody, CardFooter, Tooltip, Typography } from "@material-tailwind/react";
import { formatDistanceToNow } from 'date-fns';
import { ClockIcon, EyeIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';
import { darken, lighten } from 'polished';

const BrowseCoursesCard = ({ tab, course, headerColor }) => {
  const { img, title, tag, description, uploadDate, rating, views, favorite, enrolled } = course;

  // Convert the timestamp to a Date object
  const uploadDateObj = new Date(Number(uploadDate));

  // Format the date
  const formattedUploadDate = formatDistanceToNow(uploadDateObj, {
    addSuffix: true
  });

  // Generate a gradient style
  const gradientStyle = {
    background: `linear-gradient(to top, ${headerColor}, ${darken(0.1, headerColor)})`
  };

  return (
    <Card className="flex flex-col bg-white text-gray-700 w-full shadow-lg transform transition duration-300 hover:scale-105 border rounded-lg overflow-hidden" style={{borderColor: headerColor}}>
      <NavLink to={`/dashboard/explore-course/${course.id}`}>
        <div className="p-6 relative flex-grow" style={gradientStyle}>
          <div className='mb-6'>
            <div className="flex justify-end items-end">
              {(tab === 'All' || tab === 'Latest') && (
                <>
                  <ClockIcon className="w-4 h-4 mr-1 font-normal text-white text-xs" />
                  <Typography variant="small" className="font-normal text-white text-xs">{formattedUploadDate}</Typography>
                </>
              )}
              {(tab === 'All' || tab === 'Trending') && (
                <>
                  <EyeIcon className="w-4 h-4 mr-1 font-normal text-white text-xs" />
                  <Typography variant="small" className="font-normal text-white text-xs">{views} Views</Typography>
                </>
              )}
              {(tab === 'All' || tab === 'Top Rated') && (
                <>
                  <StarIcon className="w-4 h-4 mr-1 font-normal text-white text-xs" />
                  <Typography variant="small" className="font-normal text-white text-xs">{rating} Stars</Typography>
                </>
              )}
              {(tab === 'All' || tab === 'Most Loved') && (
                <>
                  <HeartIcon className="w-4 h-4 mr-1 font-normal text-white text-xs" />
                  <Typography variant="small" className="font-normal text-white text-xs">{favorite} Likes</Typography>
                </>
              )}
            </div>
          </div>
          <div className="absolute left-1/4 transform -translate-x-1/2 -bottom-10 w-20 h-20">
            <img src={img} alt={title} className="w-full h-full rounded-full border p-2 object-cover bg-white" style={{ borderColor: headerColor }} />
          </div>
        </div>
        <CardBody className="flex flex-col pt-12 p-4 mt-6 flex-grow text-center">
          <Typography variant="h5" className="font-bold text-blue-gray-900 mb-2">{title}</Typography>
          <Typography variant="small" className="font-normal text-blue-gray-500 mb-2">{description}</Typography>
          <Typography variant="small" className="font-normal text-blue-gray-500 mb-2 mt-4">{tag}</Typography>
        </CardBody>
        {/* <CardFooter className='p-4'>
          <NavLink to={`/dashboard/explore-course/${course.id}`}>
            <Button size="sm" className='w-full flex items-center justify-center' >
              {enrolled && (
                <Tooltip content="Enrolled">
                  <Badge
                    content={<CheckIcon className="h-4 w-4 text-white" />}
                    className="bg-gradient-to-tr from-green-400 to-green-600"
                  />
                </Tooltip>
              )}
              <span className='ml-4'>
                Explore
              </span>
            </Button>
          </NavLink>
        </CardFooter> */}
      </NavLink>
    </Card>
  );
};

export default BrowseCoursesCard;
