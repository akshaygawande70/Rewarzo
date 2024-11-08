import React, { useState, useRef, useMemo } from "react";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { categoriesData } from "@/data"; "@/data/categories-data";
import BrowseCategoriesCard from "@/widgets/cards/browse-categories-card";

const colorCodes = [
  "#a4e3da", "#fda88b", "#9ebef1", "#f69fd6", "#8786fb", 
  "#f88c8c", "#8cdbf9", "#bca1f2", "#8cd5ca", "#997fbc",
  "#a0d69a", "#ffbb94"
];

const BrowseCategories = () => {
  const headerColors = useMemo(() => {
    const extendedColors = [...colorCodes];
    while (extendedColors.length < categoriesData.length) {
      extendedColors.push(...colorCodes);
    }
    return extendedColors;
  }, [categoriesData.length]);

  return (
    <div className="-mx-2 mt-4 mb-6 lg:mx-4">
      <Card shadow={false} className="bg-transparent">
        <CardBody className="p-0">
          <div className="flex w-100 flex-col gap-8">
            <div className="mt-6 mx-4 grid gap-6 grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
              {categoriesData.map((category, categoryIndex) => (
                <div key={category.id} className="flex justify-center">
                  <BrowseCategoriesCard category={category} headerColor={headerColors[(categoryIndex) % headerColors.length]} />
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BrowseCategories;
