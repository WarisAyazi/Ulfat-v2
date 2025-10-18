import AppLayout from "@/ui/AppLayout";
import toast from "react-hot-toast";

function Dashboard() {
    return (
        <div>
            Hello World{" "}
            <button
                onClick={() => toast.success("🔥 Toast working!")}
                className="p-2 bg-green-600 text-white rounded"
            >
                Test Toast
            </button>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Dashboard;
