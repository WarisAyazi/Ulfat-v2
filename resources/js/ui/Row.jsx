import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;
    width: 100%;

    ${(props) =>
        props.type === "horizontal" &&
        css`
            align-items: center;
            justify-content: space-between;
        `}

    ${(props) =>
        props.type === "vartical" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}

    ${(props) =>
        props.type === "search" &&
        css`
            gap: 1.6rem;
        `}
`;

Row.defaultProps = {
    type: "vartical",
};

export default Row;
