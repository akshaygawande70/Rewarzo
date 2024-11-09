import { useState, useMemo } from 'react';
import {
    Card,
    CardBody,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
} from '@material-tailwind/react';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', email: 'john@example.com', total: 100, status: 'Pending', date: '2024-11-01', items: 2 },
        { id: 2, customer: 'Jane Smith', email: 'jane@example.com', total: 200, status: 'Shipped', date: '2024-10-15', items: 3 },
    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [pending, setPending] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = useMemo(() => {
        return orders.filter(
            (order) =>
                order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, orders]);

    const columns = [
        { name: 'Order ID', selector: (row) => row.id, sortable: true },
        { name: 'Customer', selector: (row) => row.customer, sortable: true },
        { name: 'Email', selector: (row) => row.email, sortable: true },
        { name: 'Total', selector: (row) => `$${row.total}`, sortable: true },
        { name: 'Status', selector: (row) => row.status, sortable: true },
        { name: 'Date', selector: (row) => row.date, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2">
                    <Button size="sm" color="blue" onClick={() => handleViewOrderDetails(row)}>View</Button>
                    <Button size="sm" color="green" onClick={() => handleUpdateOrderStatus(row)}>Update Status</Button>
                </div>
            ),
        },
    ];

    const handleViewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowOrderDetails(true);
    };

    const handleUpdateOrderStatus = (order) => {
        // Logic to update order status (e.g., shipped to delivered)
        const updatedOrders = orders.map((o) =>
            o.id === order.id ? { ...o, status: 'Shipped' } : o
        );
        setOrders(updatedOrders);
        toast.success('Order status updated!');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCloseOrderDetails = () => {
        setShowOrderDetails(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <Card className="mt-6">
                <CardBody>
                    <DataTable
                        title="Manage Orders"
                        columns={columns}
                        data={filteredOrders}
                        progressPending={pending}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        subHeader
                        subHeaderComponent={
                            <div className="flex items-center gap-4 w-full">
                                <Input
                                    placeholder="Search by Customer or Email"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full"
                                />
                            </div>
                        }
                    />
                </CardBody>
            </Card>

            {/* Order Details Dialog */}
            <Dialog open={showOrderDetails} onClose={handleCloseOrderDetails}>
                <Card>
                    <DialogHeader>
                        <Typography variant="h4">Order Details</Typography>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        {selectedOrder && (
                            <>
                                <Typography><strong>Order ID:</strong> {selectedOrder.id}</Typography>
                                <Typography><strong>Customer:</strong> {selectedOrder.customer}</Typography>
                                <Typography><strong>Email:</strong> {selectedOrder.email}</Typography>
                                <Typography><strong>Total:</strong> ${selectedOrder.total}</Typography>
                                <Typography><strong>Status:</strong> {selectedOrder.status}</Typography>
                                <Typography><strong>Date:</strong> {selectedOrder.date}</Typography>
                                <Typography><strong>Items:</strong> {selectedOrder.items}</Typography>
                                {/* Add more details as needed */}
                            </>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="outlined" onClick={handleCloseOrderDetails}>Close</Button>
                    </DialogFooter>
                </Card>
            </Dialog>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </>
    );
};

export default ManageOrders;
