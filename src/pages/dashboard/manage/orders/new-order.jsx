import { useState } from "react";
import { Card, CardBody, Button, Input, Typography, Textarea } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

const NewOrderScreen = () => {
    // Mock customer data
    const customers = [
        { id: 1, name: "John Doe", email: "john@example.com", loyaltyTier: "Gold", points: 500 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", loyaltyTier: "Silver", points: 200 },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", loyaltyTier: "Platinum", points: 1000 },
    ];

    const [orderForm, setOrderForm] = useState({
        customer: null,
        loyaltyTier: "",
        points: 0,
        products: [
            { id: 1, name: "Product 1", price: 50, quantity: 1 },
            { id: 2, name: "Product 2", price: 150, quantity: 1 },
        ],
        status: "Pending",
        specialInstructions: "",
        total: 0,
    });

    const [errors, setErrors] = useState({
        customer: "",
        products: "",
    });

    const handleCustomerChange = (selectedCustomer) => {
        if (selectedCustomer) {
            setOrderForm((prevState) => ({
                ...prevState,
                customer: selectedCustomer,
                loyaltyTier: selectedCustomer.loyaltyTier,
                points: selectedCustomer.points,
            }));
        }
    };

    const handleChangeQuantity = (productId, value) => {
        const updatedProducts = orderForm.products.map((product) =>
            product.id === productId ? { ...product, quantity: value } : product
        );
        setOrderForm({ ...orderForm, products: updatedProducts });
        calculateTotal();
    };

    const calculateTotal = () => {
        const total = orderForm.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        setOrderForm((prevState) => ({ ...prevState, total }));
    };

    const handleSaveOrder = () => {
        const newErrors = {};
        if (!orderForm.customer) {
            newErrors.customer = "Customer is required.";
        }
        if (orderForm.products.some((product) => product.quantity <= 0)) {
            newErrors.products = "Quantity must be greater than zero for all products.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        toast.success("Order created successfully!");
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: orderForm.products.length + 1,
            name: `Product ${orderForm.products.length + 1}`,
            price: Math.floor(Math.random() * 100) + 50,
            quantity: 1,
        };
        setOrderForm({ ...orderForm, products: [...orderForm.products, newProduct] });
        calculateTotal();
    };

    const customerOptions = customers.map((customer) => ({
        value: customer.id,
        label: `${customer.name} (${customer.email})`,
        ...customer,
    }));

    return (
        <div className="flex flex-col md:flex-row md:justify-center md:items-start p-4">
            {/* Order Form */}
            <Card className="w-full md:w-3/4 lg:w-1/2 shadow-lg rounded-lg p-6 mx-auto mb-8">
                <CardBody className="space-y-8">
                    <Typography variant="h4" className="font-bold text-center text-blue-gray-800">
                        Create New Order
                    </Typography>

                    {/* Customer Information */}
                    <section className="p-4 bg-gray-50 rounded-lg">
                        <Typography variant="h6" className="font-semibold text-blue-gray-700 mb-2">Customer</Typography>
                        <Select
                            options={customerOptions}
                            onChange={handleCustomerChange}
                            getOptionLabel={(option) => `${option.name} (${option.email})`}
                            getOptionValue={(option) => option.id}
                            placeholder="Select customer..."
                            className="mb-2"
                        />
                        {errors.customer && <Typography color="red" className="text-sm">{errors.customer}</Typography>}

                        {orderForm.customer && (
                            <div className="mt-2 text-gray-700">
                                <Typography>Loyalty Tier: {orderForm.loyaltyTier}</Typography>
                                <Typography>Points: {orderForm.points}</Typography>
                            </div>
                        )}
                    </section>

                    {/* Product List */}
                    <section className="p-4 bg-gray-50 rounded-lg">
                        <Typography variant="h6" className="font-semibold text-blue-gray-700 mb-2">Products</Typography>
                        {orderForm.products.map((product) => (
                            <div key={product.id} className="flex items-center justify-between py-2">
                                <div>
                                    <Typography className="font-medium">{product.name}</Typography>
                                    <Typography>${product.price}</Typography>
                                </div>
                                <Input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleChangeQuantity(product.id, Number(e.target.value))}
                                    className="w-20 ml-4"
                                    label="Quantity"
                                />
                            </div>
                        ))}
                        <Button onClick={handleAddProduct} color="green" className="w-full mt-2">
                            + Add Product
                        </Button>
                    </section>

                    {/* Special Instructions */}
                    <section className="p-4 bg-gray-50 rounded-lg">
                        <Typography variant="h6" className="font-semibold text-blue-gray-700 mb-2">Special Instructions</Typography>
                        <Textarea
                            label="Enter instructions"
                            value={orderForm.specialInstructions}
                            onChange={(e) => setOrderForm({ ...orderForm, specialInstructions: e.target.value })}
                            className="mt-2"
                        />
                    </section>

                    {/* Order Status */}
                    <section className="p-4 bg-gray-50 rounded-lg">
                        <Typography variant="h6" className="font-semibold text-blue-gray-700 mb-2">Order Status</Typography>
                        <Select
                            options={[
                                { value: "Pending", label: "Pending" },
                                { value: "Shipped", label: "Shipped" },
                                { value: "Delivered", label: "Delivered" }
                            ]}
                            value={orderForm.status}
                            onChange={(selectedOption) => setOrderForm({ ...orderForm, status: selectedOption.value })}
                            placeholder="Select status"
                        />
                    </section>

                    {/* Total and Save */}
                    <div className="flex items-center justify-between mt-6 p-4 bg-gray-100 rounded-lg">
                        <Typography variant="h5" className="font-bold text-blue-gray-800">Total: ${orderForm.total.toFixed(2)}</Typography>
                        <Button onClick={handleSaveOrder} color="blue" className="px-6 py-2">
                            Save Order
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Toast Notifications */}
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
        </div>
    );
};

export default NewOrderScreen;
