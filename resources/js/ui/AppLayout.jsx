import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const StyledApplayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 104rem;
    grid-template-rows: auto 1fr;
    max-width: 130rem;
    margin: 0 auto;
`;

const Main = styled.div`
    background-color: var(--color-grey-100);
    padding: 4rem 6.8rem 13.4rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    height: auto;
`;

function AppLayout({ children }) {
    useEffect(() => {
        const hasVisdted = sessionStorage.getItem("hasVisited");

        if (!hasVisdted) {
            sessionStorage.setItem("hasVisited", "true");
            window.location.reload();
        }
    }, []);
    return (
        <AuthenticatedLayout>
            <StyledApplayout>
                <Sidebar />
                <Main>{children}</Main>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </StyledApplayout>
        </AuthenticatedLayout>
    );
}

export default AppLayout;
