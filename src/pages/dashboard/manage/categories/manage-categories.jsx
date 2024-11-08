import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, IconButton, Menu, MenuHandler, MenuItem, MenuList, TabPanel, Tabs } from "@material-tailwind/react";
import { categoriesData } from "@/data";
import FilterComponent from '../../../../widgets/filters/FilterComponent';
import CustomLoader from '../../../../widgets/spinners/CustomLoaderOne';
import ExpandedSubcategoriesComponent from './ExpandedSubcategoriesComponent';
import DataTable from "react-data-table-component";
import { ArrowTopRightOnSquareIcon, PlusIcon } from "@heroicons/react/24/solid";
import CategoryModal from './CategoryModal';

const ManageCategories = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const uniqueStatuses = useMemo(() => (
    [...new Set(categoriesData.map(({ status }) => status)), "All"]
  ), []);

  const filteredCategories = useMemo(() => (
    categoriesData
      .filter((category) => {
        const matchesStatus = activeTab === "All" || category.status === activeTab;
        const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (category.subcategories && category.subcategories.some(subcategory => 
                                subcategory.title.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesStatus && matchesSearch;
      })
      .map(category => ({
        ...category,
        subcategories: category.subcategories?.filter(subcategory =>
          subcategory.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []
      }))
  ), [activeTab, searchQuery]);

  const categorycolumns = useMemo(() => [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: false,
    },
    {
      cell: row => (
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <IconButton variant="text">
              <i className="fas fa-ellipsis-vertical" />
            </IconButton>
          </MenuHandler>
          <MenuList className="text-xs">
            <MenuItem>Rename</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      ),
      allowOverflow: true,
      button: true,
    }
  ], []);

  const subcategorycolumns = useMemo(() => [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: false,
    },
    {
      cell: row => (
        <Menu
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <IconButton variant="text">
              <i className="fas fa-ellipsis-vertical" />
            </IconButton>
          </MenuHandler>
          <MenuList className="text-xs">
            <MenuItem>Move</MenuItem>
            <MenuItem>Rename</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      ),
      allowOverflow: true,
      button: true,
    }
  ], []);

  const paginationComponentOptions = {
    rowsPerPageText: 'Results per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  const handleModalOpen = () => setIsModalOpen(!isModalOpen);

  const handleCreateCategory = (categoryName) => {
    console.log('New Category:', categoryName);
  };

  const handleCreateSubcategory = (subcategoryName, parentCategory) => {
    console.log('New Subcategory:', subcategoryName, 'Parent Category:', parentCategory);
  };

  return (
    <div className="-mx-2 mt-6 mb-6 lg:mx-4">
      <Card shadow={false} className="bg-transparent">
        <CardBody className="p-0">
          <div className="flex w-full flex-col gap-8">
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              uniqueStatuses={uniqueStatuses}
            >
              <TabPanel key={activeTab} value={activeTab} className="px-0 pb-6">
                <div className="mt-4">
                  <Card className="w-full">
                    <CardBody>
                      <DataTable
                        pending={pending}
                        loader={<CustomLoader />}
                        subHeader
                        subHeaderComponent={
                          <>
                            <FilterComponent
                              filterText={searchQuery}
                              onFilter={(e) => handleSearch(e.target.value)}
                            />
                            <Button
                              size="sm"
                              ripple={true}
                              className="flex items-center gap-3 border border-blue-gray-600 min-w-min"
                              aria-label="Export to Excel"
                              onClick={()=>console.log('Export to Excel')}
                            >
                              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                              Export
                            </Button>
                          </>
                        }
                        title={"Categories & Subcategories"}
                        columns={categorycolumns}
                        data={filteredCategories}
                        expandableRows
                        expandOnRowClicked
                        expandableRowsComponent={(row) => (
                          <ExpandedSubcategoriesComponent data={row.data.subcategories} columns={subcategorycolumns} />
                        )}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        highlightOnHover
                        actions={
                          <>
                            <Button
                              size="sm"
                              ripple={true}
                              className="flex items-center gap-3 border border-blue-gray-600 min-w-min"
                              aria-label="Add New Category"
                              onClick={handleModalOpen}
                            >
                              <PlusIcon className="w-5 h-5" />
                              New
                            </Button>
                          </>
                        }
                      />
                    </CardBody>
                  </Card>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </CardBody>
      </Card>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalOpen}
        categoriesData={categoriesData}
        onCreateCategory={handleCreateCategory}
        onCreateSubcategory={handleCreateSubcategory}
      />
    </div>
  );
};

export default ManageCategories;
