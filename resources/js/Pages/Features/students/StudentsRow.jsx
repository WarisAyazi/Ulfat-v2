import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";
import styled from "styled-components";

const Items = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

function Student({ student }) {
    const { id, name, fname, gender, phone_number } = student;

    return (
        <Table.Row>
            <Items>{id}</Items>
            <Items>{name}</Items>
            <Items>{fname}</Items>
            <Items>{gender}</Items>
            <Items>
                <LinkBtn size="small" href={route("students.show", id)}>
                    Detail
                </LinkBtn>
            </Items>
        </Table.Row>
    );
}

export default Student;
