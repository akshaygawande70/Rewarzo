import React from 'react';
import { Input } from "@material-tailwind/react";

const FilterComponent = ({ filterText, onFilter }) => (
  <div className="mb-0 p-4 flex gap-4 justify-between items-center bg-transparent">
    <Input
      type="text"
      label="Search Categories"
      value={filterText}
      onChange={onFilter}
      className="flex-grow"
      icon={<i className="fas fa-search" />}
    />
  </div>
);

export default FilterComponent;
