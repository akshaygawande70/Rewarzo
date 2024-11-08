import React from 'react';
import { Card, CardBody, Input } from "@material-tailwind/react";
import DataTable from 'react-data-table-component';

const customStyles = {
    headRow: {
      style: {
        display: 'none',
      },
    }
  }

const ExpandedSubcategoriesComponent = ({ ...props }) => (
  <Card className="p-0 m-0 shadow-none">
    <CardBody className="p-0 pl-12">
      <DataTable
        title={null}
        columns={props.columns}
        data={props.data}
        pending={false}
        loader={<div>Loading...</div>}
        subHeaderComponent={null}
        expandableRows={false}
        expandableRowsComponent={null}
        actions={null}
        customStyles={customStyles}
      />
    </CardBody>
  </Card>
);

export default ExpandedSubcategoriesComponent;
