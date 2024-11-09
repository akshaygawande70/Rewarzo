import { useEffect, useMemo, useState } from "react";
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Button,
} from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import { customerActivityData } from "@/data";
import FilterComponent from "@/widgets/filters/FilterComponent";
import CustomLoader from "@/widgets/spinners/CustomLoaderOne";
import { UserGroupIcon } from "@heroicons/react/24/solid";

const CustomerActivityTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activityFilter, setActivityFilter] = useState("All");
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    const handleSearch = (value) => setSearchQuery(value);

    const uniqueActivities = useMemo(() => (
        ["All", ...new Set(customerActivityData.map(({ activityType }) => activityType))]
    ), []);

    const filteredData = useMemo(() => (
        customerActivityData.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.promotion.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesActivity = activityFilter === "All" || item.activityType === activityFilter;
            return matchesSearch && matchesActivity;
        })
    ), [searchQuery, activityFilter]);

    const columns = [
        {
            name: "Customer",
            selector: row => (
                <div className="flex items-center gap-4">
                    <Avatar src={row.img} alt={row.name} size="sm" variant="rounded" />
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                        {row.name}
                    </Typography>
                </div>
            ),
            sortable: true,
            minWidth: "180px",
        },
        {
            name: "Activity",
            selector: row => row.activityType,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "Points",
            selector: row => row.points,
            sortable: true,
            minWidth: "80px",
        },
        {
            name: "Promotion",
            selector: row => row.promotion,
            sortable: true,
            minWidth: "120px",
        },
        {
            name: "Date",
            selector: row => row.date,
            sortable: true,
            minWidth: "120px",
        },
    ];

    return (
        <Card className="mt-6">
            <CardBody>
                <DataTable
                    title={
                        <div className="flex items-center gap-2">
                            <UserGroupIcon className="h-5 w-5 text-blue-gray-700" /> {/* Icon beside title */}
                            <Typography variant="h6" className="text-blue-gray-800 font-semibold">
                                Customer Activity
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
                        <div className="flex items-center w-full gap-4">
                            {/* Search Bar - 80% Width */}
                            <div className="w-4/5">
                                <FilterComponent
                                    filterText={searchQuery}
                                    filterLabel={"Search by name or promotion"}
                                    onFilter={(e) => handleSearch(e.target.value)}
                                    placeholder="Search by name or promotion"
                                />
                            </div>

                            {/* Activity Filter Menu - 20% Width */}
                            <div className="w-1/5">
                                <Menu>
                                    <MenuHandler>
                                        <Button className="w-full">
                                            {activityFilter} <span className="ml-2">&#9662;</span>
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="text-xs">
                                        {uniqueActivities.map(activity => (
                                            <MenuItem key={activity} onClick={() => setActivityFilter(activity)}>
                                                {activity}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    }
                />
            </CardBody>
        </Card>
    );
};

export default CustomerActivityTable;
