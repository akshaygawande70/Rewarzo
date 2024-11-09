import { useState, useEffect, useMemo } from "react";
import {
    Card,
    CardBody,
    Button,
    Typography,
    Input,
    Textarea,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Select,
    Option,
} from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterComponent from "@/widgets/filters/FilterComponent";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";

const ProductManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [pending, setPending] = useState(true);
    const [products, setProducts] = useState([
        { id: 1, name: "Smartphone", price: 699, category: "Electronics", description: "Latest smartphone" },
        { id: 2, name: "T-shirt", price: 29, category: "Clothing", description: "100% cotton" },
    ]);
    const categories = [
        { id: 1, name: "Electronics", description: "Devices and gadgets" },
        { id: 2, name: "Clothing", description: "Apparel and accessories" },
    ];

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        setTimeout(() => setPending(false), 200);
    }, []);

    const handleSearch = (value) => setSearchQuery(value);

    const filteredData = useMemo(() => (
        products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ), [searchQuery, products]);

    const columns = [
        { name: "Product Name", selector: (row) => row.name, sortable: true },
        { name: "Price ($)", selector: (row) => row.price, sortable: true },
        { name: "Category", selector: (row) => row.category, sortable: true },
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

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEditDialog(true);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("category", product.category);
        setValue("description", product.description);
    };

    const handleDelete = (id) => {
        setDeleteProductId(id);
        setShowDeleteDialog(true);
    };

    const handleAddProduct = (data) => {
        const newProduct = { ...data, id: products.length + 1 };
        setProducts([...products, newProduct]);
        toast.success("Product added successfully!");
        setShowAddDialog(false);
    };

    const handleUpdateProduct = (data) => {
        const updatedProducts = products.map((prod) =>
            prod.id === editingProduct.id ? { ...editingProduct, ...data } : prod
        );
        setProducts(updatedProducts);
        toast.success("Product updated successfully!");
        setShowEditDialog(false);
    };

    const handleDeleteProduct = () => {
        setProducts(products.filter((prod) => prod.id !== deleteProductId));
        toast.success("Product deleted successfully!");
        setShowDeleteDialog(false);
    };

    const closeAddDialog = () => {
        reset();
        setShowAddDialog(false);
    };
    const closeEditDialog = () => {
        reset();
        setEditingProduct(null);
        setShowEditDialog(false);
    };
    const closeDeleteDialog = () => setShowDeleteDialog(false);

    return (
        <Card className="mt-6">
            <CardBody>
                <DataTable
                    title={
                        <div className="flex items-center gap-2">
                            <ArchiveBoxIcon className="h-5 w-5 text-blue-gray-700" />
                            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
                                Product Management
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
                                    filterLabel="Search by Product Name"
                                    onFilter={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by Product Name"
                                />
                            </div>
                            <div className="w-1/5">
                                <Button className="w-full" onClick={() => setShowAddDialog(true)}>
                                    Add New Product
                                </Button>
                            </div>
                        </div>
                    }
                />
            </CardBody>

            {/* Add/Edit Product Dialog */}
            <Dialog open={showAddDialog || showEditDialog} handler={closeAddDialog}>
                <DialogHeader>
                    <Typography variant="h4">{showAddDialog ? "Add New Product" : "Edit Product"}</Typography>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(showAddDialog ? handleAddProduct : handleUpdateProduct)} className="space-y-4">
                        <Input
                            label="Product Name"
                            {...register("name", { required: "Product name is required" })}
                            error={errors.name}
                        />
                        <Input
                            label="Price"
                            type="number"
                            {...register("price", { required: "Price is required", valueAsNumber: true })}
                            error={errors.price}
                        />
                        <Select label="Category" {...register("category", { required: "Category is required" })}>
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.name}>{cat.name}</Option>
                            ))}
                        </Select>
                        <Textarea
                            label="Description"
                            {...register("description", { required: "Description is required" })}
                            error={errors.description}
                        />
                        <DialogFooter>
                            <Button type="submit">{showAddDialog ? "Add Product" : "Update Product"}</Button>
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
                    <Typography>Are you sure you want to delete this product?</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleDeleteProduct}>Delete</Button>
                    <Button variant="outlined" onClick={closeDeleteDialog}>Cancel</Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
};

export default ProductManagement;
