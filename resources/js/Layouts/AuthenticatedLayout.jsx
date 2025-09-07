import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div>
            {header && (
                <header className="shadow">
                    <div>{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
