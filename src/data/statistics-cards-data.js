import { CurrencyDollarIcon, GiftIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Users",
    value: "128",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: GiftIcon,
    title: "Active Promotions",
    value: "8",
    footer: {
      color: "text-red-500",
      value: "-10%",
      label: "than last month"
    }
  },
  {
    color: "gray",
    icon: CurrencyDollarIcon,
    title: "Points Issued",
    value: "15000",
    footer: {
      color: "text-green-500",
      value: "+30%",
      label: "from previous month"
    }
  },
  {
    color: "gray",
    icon: ShoppingBagIcon,
    title: "Redemptions",
    value: "75",
    footer: {
      color: "text-green-500",
      value: "+12%",
      label: "than last month"
    }
  }
];

export default statisticsCardsData;
