import { useState, useEffect, useMemo } from "react";
import {
    Card,
    CardBody,
    Button,
    Typography,
    Input,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import FilterComponent from "@/widgets/filters/FilterComponent";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

const CategoryManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [pending, setPending] = useState(true);
    const [categories, setCategories] = useState([
        { id: 1, name: "Electronics", description: "Devices and gadgets" },
        { id: 2, name: "Clothing", description: "Apparel and accessories" },
    ]);

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        setTimeout(() => setPending(false), 200);
    }, []);

    const handleSearch = (value) => setSearchQuery(value);

    const filteredData = useMemo(() => (
        categories.filter((cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ), [searchQuery, categories]);

    const columns = [
        { name: "Category Name", selector: (row) => row.name, sortable: true },
        { name: "Description", selector: (row) => row.description, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <Button size="sm" color="green" onClick={() => handleEdit(row)}>Edit</Button>
                    <Button size="sm" color="red" onClick={() => handleDelete(row.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowEditDialog(true);
        setValue("name", category.name);
        setValue("description", category.description);
    };

    const handleDelete = (id) => {
        setDeleteCategoryId(id);
        setShowDeleteDialog(true);
    };

    const handleAddCategory = (data) => {
        const newCategory = { ...data, id: categories.length + 1 };
        setCategories([...categories, newCategory]);
        toast.success("Category added successfully!");
        setShowAddDialog(false);
    };

    const handleUpdateCategory = (data) => {
        const updatedCategories = categories.map((cat) =>
            cat.id === editingCategory.id ? { ...editingCategory, ...data } : cat
        );
        setCategories(updatedCategories);
        toast.success("Category updated successfully!");
        setShowEditDialog(false);
    };

    const handleDeleteCategory = () => {
        setCategories(categories.filter((cat) => cat.id !== deleteCategoryId));
        toast.success("Category deleted successfully!");
        setShowDeleteDialog(false);
    };

    const closeAddDialog = () => {
        reset();
        setShowAddDialog(false);
    };
    const closeEditDialog = () => {
        reset();
        setEditingCategory(null);
        setShowEditDialog(false);
    };
    const closeDeleteDialog = () => setShowDeleteDialog(false);

    return (
        <Card className="mt-6">
            <CardBody>
                <DataTable
                    title={
                        <div className="flex items-center gap-2">
                            <Squares2X2Icon className="h-5 w-5 text-blue-gray-700" />
                            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
                                Category Management
                            </Typography>
                        </div>
                    }
                    columns={columns}
                    data={filteredData}
                    progressPending={pending}
                    pagination
                    subHeader
                    subHeaderComponent={
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex-grow">
                                <FilterComponent
                                    filterText={searchQuery}
                                    filterLabel="Search by Category Name"
                                    onFilter={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by Category name"
                                />
                            </div>
                            <div className="w-1/5">
                                <Button className="w-full" onClick={() => setShowAddDialog(true)}>
                                    Add New Category
                                </Button>
                            </div>
                        </div>
                    }
                />
            </CardBody>

            {/* Add/Edit Category Dialog */}
            <Dialog open={showAddDialog || showEditDialog} handler={closeAddDialog}>
                <DialogHeader>
                    <Typography variant="h4">{showAddDialog ? "Add New Category" : "Edit Category"}</Typography>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <form onSubmit={handleSubmit(showAddDialog ? handleAddCategory : handleUpdateCategory)} className="space-y-4">
                        <Input
                            label="Category Name"
                            {...register("name", { required: "Category name is required" })}
                            error={errors.name}
                        />
                        <Input
                            label="Description"
                            {...register("description", { required: "Description is required" })}
                            error={errors.description}
                        />
                        <DialogFooter>
                            <Button type="submit">{showAddDialog ? "Add" : "Update"}</Button>
                            <Button variant="outlined" onClick={showAddDialog ? closeAddDialog : closeEditDialog}>Cancel</Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} handler={closeDeleteDialog}>
                <DialogHeader>
                    <Typography variant="h6" color="red">Confirm Delete</Typography>
                </DialogHeader>
                <DialogBody>
                    <Typography>Are you sure you want to delete this category?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleDeleteCategory}>Delete</Button>
                    <Button variant="outlined" onClick={closeDeleteDialog}>Cancel</Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
};

export default CategoryManagement;
