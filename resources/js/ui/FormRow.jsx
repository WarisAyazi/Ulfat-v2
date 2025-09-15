import styled, { css } from "styled-components";

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 0.4rem;
    ${(props) =>
        props.type === "student" &&
        css`
            display: flex;
            flex-direction: column;
            align-items: start;
        `}

    ${(props) =>
        props.type === "teacher" &&
        css`
            &:has(button) {
                display: flex;
                justify-content: end;
                gap: 1.2rem;
                padding-right: 4rem;
            }
        `}

    ${(props) =>
        props.type === "submit" &&
        css`
            &:has(button) {
                display: flex;
                justify-content: end;
                align-items: end;
                gap: 1.2rem;
                padding-right: 4rem;
                margin-top: 2rem;
            }
        `}
    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;
export default FormRow;
