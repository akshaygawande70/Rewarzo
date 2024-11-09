import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { promotionsData } from "@/data"; // Adjust the import path as needed
import FilterComponent from "@/widgets/filters/FilterComponent";
import CustomLoader from "@/widgets/spinners/CustomLoaderOne";
import { GiftIcon } from "@heroicons/react/24/solid";

const PromotionsCard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [pending, setPending] = useState(true);

    // Simulate loading effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    // Filter promotions data based on search query
    const filteredPromotions = useMemo(() => (
        promotionsData.filter((promotion) =>
            promotion.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ), [searchQuery]);

    // Memoized handle search function
    const handleSearch = useCallback((value) => setSearchQuery(value), []);

    // Handle promotion click (placeholder function)
    const handlePromotionClick = (promotionId) => {
        console.log("Clicked promotion ID:", promotionId);
    };

    return (
        <Card className="mt-6">
            <CardBody>
                {/* Header with Icon and Title */}
                <div className="flex items-center justify-between mb-3">
                    <Typography role="heading" variant="lead" className="flex items-center font-normal text-black px-4 h-14">
                        <GiftIcon className="h-6 w-6 text-blue-gray-700 mr-2" /> {/* Icon added here */}
                        Promotions
                    </Typography>
                </div>

                {/* Search Bar */}
                <div className="w-full mb-3">
                    <FilterComponent
                        filterText={searchQuery}
                        filterLabel="Search by promotion name"
                        onFilter={(e) => handleSearch(e.target.value)}
                        placeholder="Type promotion name..."
                    />
                </div>

                {/* List of Promotions */}
                {pending ? (
                    <CustomLoader />
                ) : filteredPromotions.length > 0 ? (
                    <div className="space-y-2">
                        {filteredPromotions.map((promotion) => (
                            <div
                                key={promotion.id}
                                className="p-2 bg-gray-100 rounded-md shadow-sm flex justify-between items-center cursor-pointer transition transform hover:scale-[1.02] hover:bg-gray-200"
                                onClick={() => handlePromotionClick(promotion.id)}
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Typography variant="small" className="font-medium text-blue-gray-800">
                                            {promotion.name}
                                        </Typography>
                                        <Chip
                                            variant="gradient"
                                            color="green"
                                            value="Active"
                                            className="py-0.5 px-2 text-[8px] font-medium"
                                        />
                                    </div>
                                    <div className="text-xs text-blue-gray-600 flex gap-2 mt-1">
                                        <span>Type: {promotion.type}</span>
                                        <span>Start: {promotion.startDate}</span>
                                        <span>End: {promotion.endDate}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-3 text-sm text-blue-gray-500">
                        No promotions found matching your criteria
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default PromotionsCard;
