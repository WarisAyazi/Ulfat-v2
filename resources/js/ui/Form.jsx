import styled, { css } from "styled-components";

const Form = styled.form`
    ${(props) =>
        props.type !== "modal" &&
        css`
            padding: 2.4rem 4rem;
            /* Box */
            background-color: var(--color-grey-100);
            border-radius: var(--border-radius-md);
            background-color: var(--color-grey-100);
        `}

    ${(props) =>
        props.type === "modal" &&
        css`
            width: 80rem;
        `}
    ${(props) =>
        props.type === "create" &&
        css`
            /* padding: 2.4rem 4rem; */
            border: 1px solid var(--color-grey-100);
            border-radius: var(--border-radius-md);
            background-color: var(--color-grey-100);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            align-items: start;
        `}
    
  overflow: hidden;
    font-size: 1.4rem;
`;

export default Form;
