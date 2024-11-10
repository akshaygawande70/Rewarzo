import { useState } from "react";
import {
    Card,
    CardBody,
    Button,
    Typography,
    Input,
    Textarea,
} from "@material-tailwind/react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewOrderScreen = () => {
    const customers = [
        { id: 1, name: "John Doe", email: "john@example.com", loyaltyTier: "Gold", points: 500 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", loyaltyTier: "Silver", points: 200 }
    ];
    const products = [
        { id: 1, name: "Product 1", category: "Category 1", price: 100, stock: 50 },
        { id: 2, name: "Product 2", category: "Category 2", price: 150, stock: 30 }
    ];
    const promotions = [
        { id: 1, name: "Summer Sale", type: "Discount", discount: 0.15, start: "2023-06-01", end: "2023-06-30" },
        { id: 2, name: "Black Friday", type: "Flash Sale", discount: 0.25, start: "2024-11-01", end: "2024-11-26" }
    ];

    const [orderForm, setOrderForm] = useState({
        customer: null,
        products: [],
        promotion: null,
        status: "Pending",
        specialInstructions: "",
        total: 0,
        discount: 0,
        loyaltyPointsUsed: 0,
        loyaltyPointsEarned: 0
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errors, setErrors] = useState({});

    const handleCustomerChange = (selectedCustomer) => {
        setOrderForm((prev) => ({
            ...prev,
            customer: selectedCustomer,
            discount: selectedCustomer.loyaltyTier === "Gold" ? 0.1 : 0.05,
        }));
    };

    const handleAddProduct = (product) => {
        if (selectedProducts.find((p) => p.id === product.id)) {
            toast.info("Product already added");
            return;
        }
        setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        calculateTotal([...selectedProducts, { ...product, quantity: 1 }]);
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedProducts = selectedProducts.map((product) =>
            product.id === productId ? { ...product, quantity: parseInt(quantity) } : product
        );
        setSelectedProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = selectedProducts.filter((product) => product.id !== productId);
        setSelectedProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const handlePromotionChange = (selectedPromotion) => {
        setOrderForm((prev) => ({
            ...prev,
            promotion: selectedPromotion
        }));
        calculateTotal(selectedProducts, selectedPromotion);
    };

    const calculateTotal = (products, promotion = orderForm.promotion) => {
        const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const customerDiscount = subtotal * (orderForm.discount || 0);
        const pointsDiscount = orderForm.loyaltyPointsUsed * 0.01;
        const promotionDiscount = promotion ? subtotal * promotion.discount : 0;

        const total = subtotal - customerDiscount - pointsDiscount - promotionDiscount;

        setOrderForm((prev) => ({
            ...prev,
            total: Math.max(0, total),
            loyaltyPointsEarned: Math.floor(total * 0.1)
        }));
    };

    const handleUsePoints = (pointsToUse) => {
        if (pointsToUse > (orderForm.customer?.points || 0)) {
            toast.error("Insufficient points");
            return;
        }
        setOrderForm((prev) => ({
            ...prev,
            loyaltyPointsUsed: pointsToUse
        }));
        calculateTotal(selectedProducts);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!orderForm.customer) newErrors.customer = "Please select a customer.";
        if (selectedProducts.length === 0) newErrors.products = "Please add at least one product.";
        if (orderForm.specialInstructions.length > 200) newErrors.specialInstructions = "Instructions too long.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting.");
            return;
        }
        const updatedCustomer = {
            ...orderForm.customer,
            points: orderForm.customer.points - orderForm.loyaltyPointsUsed + orderForm.loyaltyPointsEarned,
        };
        toast.success("Order created successfully!");
        setOrderForm({ ...orderForm, customer: updatedCustomer });
    };

    const activePromotions = promotions.filter((promotion) => {
        const today = new Date();
        const startDate = new Date(promotion.start);
        const endDate = new Date(promotion.end);
        return today >= startDate && today <= endDate;
    });

    return (
        <>
            <Card className="mt-6">
                <CardBody className="space-y-6">
                    <Typography variant="h5" className="font-semibold text-blue-gray-800">Create New Order</Typography>

                    <div>
                        <Typography variant="small" className="font-semibold">Customer</Typography>
                        <Select
                            options={customers}
                            onChange={handleCustomerChange}
                            getOptionLabel={(option) => `${option.name} (${option.email})`}
                            getOptionValue={(option) => option.id}
                            placeholder="Search for a customer by name or email"
                            className={`my-2 ${errors.customer ? 'border-red-500' : ''}`}
                        />
                        {errors.customer && <Typography color="red">{errors.customer}</Typography>}
                        {orderForm.customer && (
                            <div className="mt-2 bg-blue-50 p-4 rounded">
                                <Typography>Loyalty Tier: {orderForm.customer.loyaltyTier}</Typography>
                                <Typography>Available Points: {orderForm.customer.points}</Typography>
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <Typography variant="small" className="font-semibold mb-2">Use Loyalty Points</Typography>
                        <Input
                            type="number"
                            label="Points to Use"
                            value={orderForm.loyaltyPointsUsed}
                            onChange={(e) => handleUsePoints(Number(e.target.value))}
                            min={0}
                            max={orderForm.customer?.points || 0}
                        />
                    </div>

                    <div className="mt-4">
                        <Typography variant="small" className="font-semibold">Select Promotion</Typography>
                        <Select
                            options={activePromotions}
                            onChange={handlePromotionChange}
                            getOptionLabel={(promotion) => `${promotion.name} (${promotion.discount * 100}% off)`}
                            getOptionValue={(promotion) => promotion.id}
                            placeholder="Choose a promotion (if available)"
                        />
                    </div>

                    <div>
                        <Typography variant="small" className="font-semibold">Products</Typography>
                        <Select
                            options={products}
                            onChange={handleAddProduct}
                            getOptionLabel={(product) => `${product.name} - $${product.price}`}
                            getOptionValue={(product) => product.id}
                            placeholder="Add products to order"
                        />
                        {errors.products && <Typography color="red">{errors.products}</Typography>}
                        <div className="mt-4">
                            {selectedProducts.map((product) => (
                                <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-200 w-2/3">
                                    <div className="flex flex-col w-1/3">
                                        <Typography variant="body1" className="font-medium text-gray-700">{product.name}</Typography>
                                        <Typography variant="small" className="text-gray-500">Price: ${product.price.toFixed(2)}</Typography>
                                    </div>
                                    <div className="w-full flex items-center ml-2">
                                        <Input
                                            type="number"
                                            value={product.quantity}
                                            min={1}
                                            max={product.stock}
                                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                            className="w-20"
                                            label="Qty"
                                        />
                                    </div>
                                    <Typography className="w-1/4 text-right font-medium text-gray-700">
                                        ${Number(product.price * product.quantity).toFixed(2)}
                                    </Typography>
                                    <Button
                                        size="sm"
                                        color="red"
                                        onClick={() => handleRemoveProduct(product.id)}
                                        className="ml-2"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <Typography variant="h6" className="font-semibold">Order Summary</Typography>
                        <Typography>Subtotal: ${(orderForm.total / (1 - orderForm.discount)).toFixed(2)}</Typography>
                        <Typography>Customer Discount: ${(orderForm.total / (1 - orderForm.discount) * orderForm.discount).toFixed(2)}</Typography>
                        <Typography>Promotion Discount: ${(orderForm.promotion?.discount || 0 * orderForm.total).toFixed(2)}</Typography>
                        <Typography>Points Discount: ${(orderForm.loyaltyPointsUsed * 0.01).toFixed(2)}</Typography>
                        <Typography>Total: ${orderForm.total.toFixed(2)}</Typography>
                        <Typography>Points Earned: {orderForm.loyaltyPointsEarned}</Typography>
                    </div>

                    <div className="mt-6">
                        <Textarea
                            label="Enter any special instructions for the order"
                            value={orderForm.specialInstructions}
                            onChange={(e) => setOrderForm({ ...orderForm, specialInstructions: e.target.value })}
                            maxLength={200}
                        />
                        {errors.specialInstructions && <Typography color="red">{errors.specialInstructions}</Typography>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSubmit}>Save Order</Button>
                    </div>
                </CardBody>
            </Card>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar pauseOnHover />
        </>
    );
};

export default NewOrderScreen;
