import AppLayout from "@/ui/AppLayout";
import toast from "react-hot-toast";
import BudgetDashboard from "./BudgetDashboard";

function Dashboard({ auth, dashboard_stats }) {
    return (
        <>
            <BudgetDashboard />
        </>
    );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Dashboard;
