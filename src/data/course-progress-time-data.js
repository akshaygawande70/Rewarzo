import { chartsConfig } from "@/configs";

const courseProgressTimeChart = {
  type: "donut",
  height: 220,
  series: [50, 20, 10, 22, 50, 10, 40],
  options: {
    ...chartsConfig,
    colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
    labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
  },
};


export const courseProgressTimeChartsData = [
  {
    color: "white",
    title: "Course Progress",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: courseProgressTimeChart,
  }
];

export default courseProgressTimeChartsData;
