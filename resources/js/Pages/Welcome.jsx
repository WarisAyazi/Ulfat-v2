import Heading from "@/ui/Heading";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const current = new Date().getFullYear();

    return (
        <>
            <Head title="Welcome" />
            <div className=" text-black/50 ">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center"></div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-black/80 dark:focus-visible:ring-black"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-black dark:hover:text-black/80 dark:focus-visible:ring-black"
                                        >
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-2 flex justify-center">
                            <img
                                src="logo.jpg"
                                width="600px"
                                // height="800px"
                                alt="Logo"
                            />
                        </main>

                        <footer className="py-16 text-center text-lg text-black dark:text-black/70">
                            <Heading as="h3">
                                &copy; copyright Abdul Waris Ayazi and Mustafa
                                Amirzida "{current}"
                            </Heading>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
