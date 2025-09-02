import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AppLayout from "@/ui/AppLayout";

import { Head, Link } from "@inertiajs/react";

function Account() {
    <Head title="Account" />;

    return (
        <AuthenticatedLayout>
            <h1>hello to me</h1>
            <Link href="/dashboard">sdfd</Link>
        </AuthenticatedLayout>
    );
}

Account.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Account;
