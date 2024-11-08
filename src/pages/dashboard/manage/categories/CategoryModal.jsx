import React, { useState } from "react";
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option, Button, Tabs, TabPanel, TabsHeader, Tab, Textarea, TabsBody } from "@material-tailwind/react";

const CategoryModal = ({ isOpen, onClose, onCreateCategory, onCreateSubcategory, categoriesData }) => {
  const [activeModalTab, setActiveModalTab] = useState("Category");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryDescription, setNewSubcategoryDescription] = useState("");
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [filteredCategoriesOptions, setFilteredCategoriesOptions] = useState(categoriesData);

  const handleCreateCategory = () => {
    onCreateCategory(newCategoryName, newCategoryDescription);
    onClose();
    setNewCategoryName("");
    setNewCategoryDescription("");
  };

  const handleCreateSubcategory = () => {
    onCreateSubcategory(newSubcategoryName, newSubcategoryDescription, selectedParentCategory);
    onClose();
    setNewSubcategoryName("");
    setNewSubcategoryDescription("");
    setSelectedParentCategory("");
  };

  // const search = (event) => {
  //   // console.log(categoriesData.filter((category) => {
  //   //   return category.title.toLowerCase().includes(event.query.toLowerCase());
  //   // }));
  //   setFilteredCategoriesOptions(categoriesData.filter((category) => {
  //     return category.title.toLowerCase().includes(event.query.toLowerCase());
  //   }));
  // }

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
        let _filteredCategoriesOptions;

        if (!event.query.trim().length) {
            _filteredCategoriesOptions = [...categoriesData];
        }
        else {
            _filteredCategoriesOptions = categoriesData.filter((category) => {
                return category.title.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        console.log(_filteredCategoriesOptions);
        
        setFilteredCategoriesOptions(_filteredCategoriesOptions);
    }, 250);
  }

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Create New</DialogHeader>
      <DialogBody divider>
        <Tabs value={activeModalTab}>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <TabsHeader className="overflow-x-auto whitespace-nowrap">
              <Tab key="Category" value="Category" onClick={() => setActiveModalTab("Category")}>
                <div className="flex items-center gap-2">Category</div>
              </Tab>
              <Tab key="Subcategory" value="Subcategory" onClick={() => setActiveModalTab("Subcategory")}>
                <div className="flex items-center gap-2">Subcategory</div>
              </Tab>
            </TabsHeader>
          </div>
          <TabsBody>
            <TabPanel key="Category" value="Category" className="px-0 pb-6">
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Textarea
                  label="Category Description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                />
              </div>
            </TabPanel>
            <TabPanel key="Subcategory" value="Subcategory" className="px-0 pb-6">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label="Subcategory Name"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
              />
              <Textarea
                label="Subcategory Description"
                value={newSubcategoryDescription}
                onChange={(e) => setNewSubcategoryDescription(e.target.value)}
              />
              {/* <Select
                label="Parent Category"
                value={selectedParentCategory}
                onChange={(value) => setSelectedParentCategory(value)}
              >
                {categoriesData.map(category => (
                  <Option key={category.id} value={category.id}>
                    {category.title}
                  </Option>
                ))}
              </Select> */}
              <span className="p-float-label">
                <AutoComplete inputId="ac" value={selectedParentCategory} suggestions={filteredCategoriesOptions} completeMethod={search} onChange={(value) => setSelectedParentCategory(value)} />
                <label htmlFor="ac">Float Label</label>
              </span>
            </div>
            </TabPanel>
            </TabsBody>
        </Tabs>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        {activeModalTab === "Category" ? (
          <Button variant="gradient" size="sm" onClick={handleCreateCategory}>
            Create Category
          </Button>
        ) : (
          <Button variant="gradient" size="sm" onClick={handleCreateSubcategory}>
            Create Subcategory
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default CategoryModal;
