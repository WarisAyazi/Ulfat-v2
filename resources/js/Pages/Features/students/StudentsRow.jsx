import LinkBtn from "@/ui/LinkBtn";
import styled from "styled-components";

const TableRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    &:hover {
        background-color: var(--color-grey-100);
    }
`;

const Items = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

function Student({ student }) {
    const { id, first_name, last_name, gender, phone_number } = student;

    return (
        <TableRow role="row">
            <Items>{id}</Items>
            <Items>{first_name}</Items>
            <Items>{last_name}</Items>
            <Items>{gender}</Items>
            <Items>
                <LinkBtn size="small" href={route("students.show", { id })}>
                    Detail
                </LinkBtn>
            </Items>
        </TableRow>
    );
}

export default Student;
