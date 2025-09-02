import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const StyledApplayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Main = styled.div`
    background-color: var(--color-grey-100);
    padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout({ children }) {
    return (
        <AuthenticatedLayout>
            <StyledApplayout>
                <Header />
                <Sidebar />
                <Main>
                    <div>App layout</div>
                    {children}
                </Main>
            </StyledApplayout>
        </AuthenticatedLayout>
    );
}

export default AppLayout;
