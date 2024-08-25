import EmptyState from "../../component/emptyState";
import Chart from "./chart";

export const tabs = [
    {
        title: 'Summary',
        id: 'overview',
        children: () => <EmptyState />,
    },
    {
        title: 'Chart',
        id: 'chart',
        children: (props) => <Chart {...props} />,
    },
    {
        title: 'Statistics',
        id: 'statistics',
        children: () => <EmptyState />,
    },
    {
        title: 'Analysis',
        id: 'analysis',
        children: () => <EmptyState />,
    },
    {
        title: 'Settings',
        id: 'settings',
        children: () => <EmptyState />,
    }
]
