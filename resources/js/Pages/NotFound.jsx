import Heading from "@/ui/Heading";
import { Link } from "@inertiajs/react";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom right, #f1f5f9, #e2e8f0);
    color: #1e293b;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 6rem;
    font-weight: 800;
    margin: 0;
    color: #334155;
`;

const HomeButton = styled(Link)`
    margin-top: 2rem;
    background: var(--color-brand-600);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;

    &:hover {
        background: var(--color-brand-700);
    }
`;

export default function NotFound() {
    return (
        <Wrapper>
            <Title>404</Title>
            <Heading as="h1">
                Oops! Plase reload the page or the page you’re looking for
                doesn’t exist.
            </Heading>
            <HomeButton href="/dashboard">Go back home</HomeButton>
        </Wrapper>
    );
}
