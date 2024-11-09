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
    IconButton,
} from "@material-tailwind/react";
import { UserGroupIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DataTable from "react-data-table-component";
import CustomLoader from "@/widgets/spinners/CustomLoaderOne";
import FilterComponent from "@/widgets/filters/FilterComponent";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS globally

const LoyaltyTierManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [pending, setPending] = useState(true);
    const [loyaltyTiers, setLoyaltyTiers] = useState([
        { id: 1, name: "Silver", pointsThreshold: 0, perks: "5% discount", bonusPoints: 50 },
        { id: 2, name: "Gold", pointsThreshold: 500, perks: "10% discount + early access", bonusPoints: 100 },
        { id: 3, name: "Platinum", pointsThreshold: 1000, perks: "15% discount + free shipping", bonusPoints: 150 },
    ]);

    // Dialog States
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [editingTier, setEditingTier] = useState(null);
    const [deleteTierId, setDeleteTierId] = useState(null);

    // Form state
    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    const handleSearch = (value) => setSearchQuery(value);

    const filteredData = useMemo(() => (
        loyaltyTiers.filter((tier) => {
            const matchesSearch = tier.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        })
    ), [searchQuery, loyaltyTiers]);

    const columns = [
        { name: "Tier Name", selector: (row) => row.name, sortable: true, minWidth: "180px" },
        { name: "Points Threshold", selector: (row) => row.pointsThreshold, sortable: true, minWidth: "160px" },
        { name: "Perks", selector: (row) => row.perks, sortable: true, minWidth: "180px" },
        { name: "Bonus Points", selector: (row) => row.bonusPoints, sortable: true, minWidth: "120px" },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <Button size="sm" color="green" onClick={() => handleEdit(row)}>Edit</Button>
                    <Button size="sm" color="red" onClick={() => handleDelete(row.id)}>Delete</Button>
                </div>
            ),
            minWidth: "120px",
        },
    ];

    const handleEdit = (tier) => {
        setEditingTier(tier);
        setShowEditDialog(true);
        // Populate form values using setValue
        setValue("name", tier.name);
        setValue("pointsThreshold", tier.pointsThreshold);
        setValue("perks", tier.perks);
        setValue("bonusPoints", tier.bonusPoints);
    };

    const handleDelete = (id) => {
        setDeleteTierId(id);
        setShowDeleteDialog(true);
    };

    const handleAddTier = (data) => {
        const newTierData = { ...data, id: loyaltyTiers.length + 1 };
        setLoyaltyTiers([...loyaltyTiers, newTierData]);
        toast.success("Loyalty Tier added successfully!"); // React Toastify notification
        setShowAddDialog(false);
    };

    const handleUpdateTier = (data) => {
        const updatedTiers = loyaltyTiers.map((tier) =>
            tier.id === editingTier.id ? { ...editingTier, ...data } : tier
        );
        setLoyaltyTiers(updatedTiers);
        toast.success("Loyalty Tier updated successfully!"); // React Toastify notification
        setShowEditDialog(false);
    };

    const handleDeleteTier = () => {
        const filteredTiers = loyaltyTiers.filter((tier) => tier.id !== deleteTierId);
        setLoyaltyTiers(filteredTiers);
        toast.success("Loyalty Tier deleted successfully!"); // React Toastify notification
        setShowDeleteDialog(false);
    };

    // Close dialog handlers
    const closeAddDialog = () => {
        reset(); // Reset form state when closing the Add dialog
        setShowAddDialog(false);
    };
    const closeEditDialog = () => {
        reset(); // Reset form state when closing the Edit dialog
        setEditingTier(null); // Clear the selected editing tier
        setShowEditDialog(false);
    };
    const closeDeleteDialog = () => setShowDeleteDialog(false);

    return (
        <Card className="mt-6">
            <CardBody>
                <DataTable
                    title={
                        <div className="flex items-center gap-2">
                            <UserGroupIcon className="h-5 w-5 text-blue-gray-700" />
                            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
                                Loyalty Tiers Management
                            </Typography>
                        </div>
                    }
                    columns={columns}
                    data={filteredData}
                    progressPending={pending}
                    progressComponent={<CustomLoader />}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    subHeader
                    subHeaderComponent={
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex-grow">
                                <FilterComponent
                                    filterText={searchQuery}
                                    filterLabel="Search by Tier Name"
                                    onFilter={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by tier name"
                                />
                            </div>
                            <div className="w-1/5">
                                <Button className="w-full" onClick={() => setShowAddDialog(true)}>
                                    Add New Tier
                                </Button>
                            </div>
                        </div>
                    }
                />
            </CardBody>

            {/* Add/Edit Dialog */}
            <Dialog size="sm" open={showAddDialog || showEditDialog} handler={showAddDialog ? closeAddDialog : closeEditDialog}>
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        {showAddDialog ? "Add New Loyalty Tier" : "Edit Loyalty Tier"}
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute !top-4 !right-4"
                        onClick={showAddDialog ? closeAddDialog : closeEditDialog}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <form
                        onSubmit={handleSubmit(showAddDialog ? handleAddTier : handleUpdateTier)}
                        className="space-y-4"
                    >
                        <Input
                            label="Tier Name"
                            {...register("name", { required: "Tier name is required" })}
                            error={errors.name}
                        />
                        <Input
                            label="Points Threshold"
                            type="number"
                            {...register("pointsThreshold", { required: "Points Threshold is required", valueAsNumber: true })}
                            error={errors.pointsThreshold}
                        />
                        <Textarea
                            label="Perks"
                            {...register("perks", { required: "Perks are required" })}
                            error={errors.perks}
                        />
                        <Input
                            label="Bonus Points"
                            type="number"
                            {...register("bonusPoints", { required: "Bonus Points are required", valueAsNumber: true })}
                            error={errors.bonusPoints}
                        />
                        <DialogFooter>
                            <Button type="submit">{showAddDialog ? "Add Tier" : "Update Tier"}</Button>
                            <Button onClick={showAddDialog ? closeAddDialog : closeEditDialog} variant="outlined">Cancel</Button>
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} handler={closeDeleteDialog}>
                <DialogHeader>
                    <Typography variant="h6" color="red">
                        Confirm Delete
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <Typography>
                        Are you sure you want to delete this tier? This action cannot be undone.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" onClick={handleDeleteTier}>Delete</Button>
                    <Button onClick={closeDeleteDialog} variant="outlined">Cancel</Button>
                </DialogFooter>
            </Dialog>
        </Card>
    );
};

export default LoyaltyTierManagement;
