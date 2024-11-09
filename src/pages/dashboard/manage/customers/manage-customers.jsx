import { useState, useMemo } from "react";
import {
    Card,
    CardBody,
    Button,
    Input,
    Select,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DataTable from "react-data-table-component";
import FilterComponent from "@/widgets/filters/FilterComponent"; // Custom filter component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrders = () => {
    // States for order data
    const [orders, setOrders] = useState([
        { id: 1, customerName: "John Doe", email: "john@example.com", total: 150, status: "Pending", date: "2024-11-01", items: 2 },
        { id: 2, customerName: "Jane Smith", email: "jane@example.com", total: 250, status: "Shipped", date: "2024-10-25", items: 3 },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pending, setPending] = useState(false);

    // Dialog States
    const [showAddEditDialog, setShowAddEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Form States for add/edit
    const [orderForm, setOrderForm] = useState({
        id: null,
        customerName: "",
        email: "",
        total: 0,
        status: "Pending",
        items: 1,
        date: "",
    });

    const [deleteOrderId, setDeleteOrderId] = useState(null);

    // Filter and search logic
    const handleSearch = (value) => setSearchQuery(value);

    const filteredOrders = useMemo(() => {
        return orders.filter(
            (order) =>
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toString().includes(searchQuery)
        );
    }, [searchQuery, orders]);

    const columns = [
        { name: "Order ID", selector: (row) => row.id, sortable: true },
        { name: "Customer Name", selector: (row) => row.customerName, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Total", selector: (row) => `$${row.total}`, sortable: true },
        { name: "Status", selector: (row) => row.status, sortable: true },
        { name: "Date", selector: (row) => row.date, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <Button size="sm" color="green" onClick={() => handleAddEditDialogOpen(row)}>Edit</Button>
                    <Button size="sm" color="red" onClick={() => handleDeleteDialogOpen(row.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    // Handlers
    const handleAddEditDialogOpen = (order = null) => {
        if (order) {
            setOrderForm(order);
        } else {
            setOrderForm({ id: null, customerName: "", email: "", total: 0, status: "Pending", items: 1, date: "" });
        }
        setShowAddEditDialog(true);
    };

    const handleDeleteDialogOpen = (id) => {
        setDeleteOrderId(id);
        setShowDeleteDialog(true);
    };

    const handleSaveOrder = () => {
        // Add or Edit Order
        if (orderForm.id) {
            setOrders(orders.map((order) => (order.id === orderForm.id ? orderForm : order)));
            toast.success("Order updated successfully!");
        } else {
            setOrders([...orders, { ...orderForm, id: orders.length + 1 }]);
            toast.success("New order added successfully!");
        }
        setShowAddEditDialog(false);
    };

    const handleDeleteOrder = () => {
        setOrders(orders.filter((order) => order.id !== deleteOrderId));
        toast.success("Order deleted successfully!");
        setShowDeleteDialog(false);
    };

    const handleCloseDialog = () => {
        setShowAddEditDialog(false);
        setShowDeleteDialog(false);
    };

    return (
        <>
            <Card className="mt-6">
                <CardBody>
                    <DataTable
                        title={
                            <div className="flex items-center gap-2">
                                <ShoppingCartIcon className="h-5 w-5 text-blue-gray-700" />
                                <Typography variant="h6" className="text-blue-gray-800 font-semibold">
                                    Manage Orders
                                </Typography>
                            </div>
                        }
                        columns={columns}
                        data={filteredOrders}
                        progressPending={pending}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        subHeader
                        subHeaderComponent={
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex-grow">
                                    <FilterComponent
                                        filterText={searchQuery}
                                        filterLabel="Search by Order ID, Customer Name, or Email"
                                        onFilter={(e) => handleSearch(e.target.value)}
                                        placeholder="Search orders"
                                    />
                                </div>
                                <div className="w-1/5">
                                    <Button onClick={() => handleAddEditDialogOpen()} className="w-full">
                                        Add New Order
                                    </Button>
                                </div>
                            </div>
                        }
                    />
                </CardBody>

                {/* Add/Edit Order Dialog */}
                <Dialog open={showAddEditDialog} onClose={handleCloseDialog}>
                    <Card>
                        <DialogHeader>
                            <Typography variant="h4">{orderForm.id ? "Edit" : "Add"} Order</Typography>
                            <IconButton
                                size="sm"
                                variant="text"
                                className="!absolute right-3.5 top-3.5"
                                onClick={handleCloseDialog}
                            >
                                <XMarkIcon className="h-4 w-4 stroke-2" />
                            </IconButton>
                        </DialogHeader>
                        <DialogBody className="space-y-4 pb-6">
                            <div>
                                <Input
                                    label="Customer Name"
                                    value={orderForm.customerName}
                                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Email"
                                    value={orderForm.email}
                                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Total Amount"
                                    type="number"
                                    value={orderForm.total}
                                    onChange={(e) => setOrderForm({ ...orderForm, total: e.target.value })}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Status"
                                    value={orderForm.status}
                                    onChange={(e) => setOrderForm({ ...orderForm, status: e })}
                                >
                                    <Option value="Pending">Pending</Option>
                                    <Option value="Shipped">Shipped</Option>
                                    <Option value="Delivered">Delivered</Option>
                                    <Option value="Cancelled">Cancelled</Option>
                                </Select>
                            </div>
                            <div>
                                <Input
                                    label="Items"
                                    type="number"
                                    value={orderForm.items}
                                    onChange={(e) => setOrderForm({ ...orderForm, items: e.target.value })}
                                />
                            </div>
                            <div>
                                <Input
                                    label="Order Date"
                                    type="date"
                                    value={orderForm.date}
                                    onChange={(e) => setOrderForm({ ...orderForm, date: e.target.value })}
                                />
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button onClick={handleSaveOrder}>Save</Button>
                            <Button variant="outlined" onClick={handleCloseDialog}>Cancel</Button>
                        </DialogFooter>
                    </Card>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onClose={handleCloseDialog}>
                    <Card>
                        <DialogBody>
                            <Typography variant="h6" className="font-semibold text-red-600">
                                Are you sure you want to delete this order?
                            </Typography>
                        </DialogBody>
                        <DialogFooter>
                            <Button color="red" onClick={handleDeleteOrder}>Delete</Button>
                            <Button color="green" onClick={handleCloseDialog} variant="outlined">Cancel</Button>
                        </DialogFooter>
                    </Card>
                </Dialog>
            </Card>

            {/* Toast Notifications Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default ManageOrders;
