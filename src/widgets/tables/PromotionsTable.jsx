import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardBody, Menu, MenuHandler, MenuItem, MenuList, Button, Chip } from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { promotionsData } from "@/data"; // Adjust the import path as needed
import FilterComponent from "@/widgets/filters/FilterComponent";
import CustomLoader from "@/widgets/spinners/CustomLoaderOne";

const PromotionsTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [pending, setPending] = useState(true);

    // Simulate loading effect
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    // Unique statuses for filter options
    const uniqueStatuses = useMemo(() => (
        ["All", "Active", "Expired"]
    ), []);

    // Filter promotions data based on search and status filter
    const filteredPromotions = useMemo(() => (
        promotionsData.filter((promotion) => {
            const matchesSearch = promotion.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "All" || promotion.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
    ), [searchQuery, statusFilter]);

    // Memoized handle search function
    const handleSearch = useCallback((value) => setSearchQuery(value), []);

    // DataTable columns configuration
    const columns = [
        {
            name: "Promotion Name",
            selector: row => row.name,
            sortable: true,
            wrap: true,
            minWidth: "180px",
        },
        {
            name: "Type",
            selector: row => row.type,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "Start Date",
            selector: row => row.startDate,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "End Date",
            selector: row => row.endDate,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "Status",
            selector: row => (
                <Chip
                    variant="gradient"
                    color={row.status === "Active" ? "green" : "red"}
                    value={row.status}
                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                />
            ),
            sortable: true,
            minWidth: "100px",
        },
    ];

    return (
        <Card className="mt-4">
            <CardBody>
                <DataTable
                    title="Active Promotions"
                    columns={columns}
                    data={filteredPromotions}
                    progressPending={pending}
                    progressComponent={<CustomLoader />}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    subHeader
                    subHeaderComponent={
                        <div className="flex items-center w-full gap-4">
                            {/* Search Bar - 80% Width */}
                            <div className="w-4/5">
                                <FilterComponent
                                    filterText={searchQuery}
                                    filterLabel="Search by promotion name"
                                    onFilter={(e) => handleSearch(e.target.value)}
                                    placeholder="Type promotion name..."
                                />
                            </div>

                            {/* Status Filter Menu - 20% Width */}
                            <div className="w-1/5">
                                <Menu>
                                    <MenuHandler>
                                        <Button className="w-full">
                                            {statusFilter} <span className="ml-2">&#9662;</span>
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="text-xs">
                                        {uniqueStatuses.map(status => (
                                            <MenuItem key={status} onClick={() => setStatusFilter(status)}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    }
                    noDataComponent={<div className="text-center py-4">No promotions found matching your criteria</div>}
                    customStyles={{
                        rows: { style: { minHeight: "50px" } },  // Row height
                        headCells: {
                            style: {
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#3C4257",
                            },
                        },
                    }}
                />
            </CardBody>
        </Card>
    );
};

export default PromotionsTable;
