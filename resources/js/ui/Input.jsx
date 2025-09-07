import styled, { css } from "styled-components";

const Input = styled.input`
    ${(props) =>
        props.kind === "search" &&
        css`
            width: 300%;
        `}
    border: 1px solid var(--color-grey-300);
    padding: 0.8rem 1.2rem;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-md);
    width: 90%;
    font-size: 1.2rem;
    height: 4rem;

    font-weight: 500;
`;

export default Input;
