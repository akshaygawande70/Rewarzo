import React from 'react';
import { Card, CardBody, Tooltip, Typography } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

const BrowseCategoriesCard = ({ category, headerColor }) => {
  const { id, img, title, description, route } = category;

  // Generate a gradient style
  const gradientStyle = {
    background: `linear-gradient(to top, ${headerColor}, ${darken(0.1, headerColor)})`
  };

  return (
    <Card className="w-full sm:w-72 md:w-80 lg:w-96 h-48 sm:h-64 md:h-72 lg:h-80 relative transform transition duration-300 hover:scale-105 border-0 rounded-lg overflow-hidden" style={{ ...gradientStyle, ...{ borderColor: headerColor } }}>
      <NavLink to={`/dashboard/explore-course/${id}`} className="h-full">
        <CardBody className="h-full pt-4 sm:pt-8 flex flex-col">
          <Typography
            variant="h6"
            color="white"
            className="mb-2 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
          >
            {title}
          </Typography>
          
          <Tooltip content={
            <div className="w-80">
              <Typography color="white" className="font-medium">
                {title}
              </Typography>
              <Typography
                variant="small"
                color="white"
                className="font-normal opacity-80"
              >
                {description}
              </Typography>
            </div>
          }>
            <Typography
              variant="small"
              color="white"
              className="mb-2 text-xs"
            >
              {`${description.substring(0, 50)}...`}
            </Typography>
          </Tooltip>
        </CardBody>
        <img 
          src={img} 
          alt={title} 
          className="absolute bottom-2 right-2 object-contain opacity-40 w-20 sm:w-28 md:w-32 lg:w-40 h-20 sm:h-28 md:h-32 lg:h-40 p-4"
        />
      </NavLink>
    </Card>
  );
};

export default BrowseCategoriesCard;
