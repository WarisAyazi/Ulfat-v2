import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Button from "@/ui/Button";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <div>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <Button>heoo</Button>
                            <Link href="/account">sdfd</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
