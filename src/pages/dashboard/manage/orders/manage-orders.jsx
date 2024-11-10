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
    Select,
    Option
} from '@material-tailwind/react';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrders = () => {
    const [orders, setOrders] = useState([
        {
            id: 1,
            customer: 'John Doe',
            email: 'john@example.com',
            total: 100,
            status: 'Pending',
            date: '2024-11-01',
            items: [
                { name: 'Product 1', price: 50, quantity: 1 },
                { name: 'Product 2', price: 50, quantity: 1 },
            ],
            pointsEarned: 10,
            pointsUsed: 0,
            promotionDiscount: 10 // New promotional discount field
        },
        {
            id: 2,
            customer: 'Jane Smith',
            email: 'jane@example.com',
            total: 200,
            status: 'Shipped',
            date: '2024-10-15',
            items: [
                { name: 'Product 3', price: 100, quantity: 2 },
            ],
            pointsEarned: 20,
            pointsUsed: 10,
            promotionDiscount: 20 // New promotional discount field
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [pending, setPending] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');

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
        { name: 'Total', selector: (row) => `$${row.total.toFixed(2)}`, sortable: true },
        { name: 'Status', selector: (row) => row.status, sortable: true },
        { name: 'Date', selector: (row) => row.date, sortable: true },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2">
                    <Button size="sm" color="blue" onClick={() => handleViewOrderDetails(row)}>View</Button>
                    <Button size="sm" color="green" onClick={() => handleUpdateOrderStatus(row)}>Update</Button>
                </div>
            ),
            width: '200px',
        },
    ];

    const handleViewOrderDetails = (order) => {
        setSelectedOrder(order);
        setUpdatedStatus(order.status);
        setShowOrderDetails(true);
    };

    const handleUpdateOrderStatus = (order) => {
        const updatedOrders = orders.map((o) =>
            o.id === order.id ? { ...o, status: updatedStatus } : o
        );
        setOrders(updatedOrders);
        toast.success('Order status updated!');
        setShowOrderDetails(false);
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
                <div className="overflow-x-auto">
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
                </div>
            </Card>

            {/* Order Details Dialog - Invoice Style */}
            <Dialog open={showOrderDetails} size='lg' onClose={handleCloseOrderDetails}>
                <Card style={{ maxHeight: 'calc(100vh - 100px)' }} className='overflow-y-auto'>
                    <DialogHeader>
                        <Typography variant="h4">Invoice</Typography>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                        {selectedOrder && (
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-4 mb-4">
                                    <Typography variant="h5" color="blue-gray">Your Company Name</Typography>
                                    <div>
                                        <Typography><strong>Invoice #:</strong> {selectedOrder.id}</Typography>
                                        <Typography><strong>Date:</strong> {selectedOrder.date}</Typography>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Typography variant="h6" className="font-semibold">Billing Information</Typography>
                                    <Typography><strong>Customer:</strong> {selectedOrder.customer}</Typography>
                                    <Typography><strong>Email:</strong> {selectedOrder.email}</Typography>
                                </div>

                                <div className="mt-4">
                                    <Typography variant="h6" className="font-semibold mb-2">Order Summary</Typography>
                                    <div className="grid grid-cols-4 gap-4 border-b pb-2 font-semibold">
                                        <Typography>Item</Typography>
                                        <Typography>Quantity</Typography>
                                        <Typography>Unit Price</Typography>
                                        <Typography>Total</Typography>
                                    </div>
                                    {selectedOrder.items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-4 gap-4 py-2 border-b">
                                            <Typography>{item.name}</Typography>
                                            <Typography>{item.quantity}</Typography>
                                            <Typography>${item.price.toFixed(2)}</Typography>
                                            <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 space-y-1 border-t pt-4">
                                    <div className="flex justify-between">
                                        <Typography><strong>Subtotal:</strong></Typography>
                                        <Typography>${selectedOrder.total.toFixed(2)}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography><strong>Promotion Discount:</strong></Typography>
                                        <Typography>-${selectedOrder.promotionDiscount.toFixed(2)}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography><strong>Points Used:</strong></Typography>
                                        <Typography>{selectedOrder.pointsUsed}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography><strong>Final Total:</strong></Typography>
                                        <Typography>${(selectedOrder.total - selectedOrder.promotionDiscount - selectedOrder.pointsUsed).toFixed(2)}</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography><strong>Points Earned:</strong></Typography>
                                        <Typography>{selectedOrder.pointsEarned}</Typography>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Typography variant="h6" className="font-semibold mb-2">Update Order Status</Typography>
                                    <Select
                                        value={updatedStatus}
                                        onChange={(e) => setUpdatedStatus(e.target.value)}
                                        label='Select Status'
                                        animate={{
                                            mount: { y: 0 },
                                            unmount: { y: 25 },
                                        }}
                                    >
                                        <Option value="Pending">Pending</Option>
                                        <Option value="Shipped">Shipped</Option>
                                        <Option value="Delivered">Delivered</Option>
                                        <Option value="Cancelled">Cancelled</Option>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button variant="outlined" onClick={handleCloseOrderDetails}>Close</Button>
                        <Button onClick={() => handleUpdateOrderStatus(selectedOrder)}>Save Changes</Button>
                    </DialogFooter>
                </Card>
            </Dialog>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </>
    );
};

export default ManageOrders;
