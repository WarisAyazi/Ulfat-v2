import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";
import styled from "styled-components";

const Items = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

function Subject({ course }) {
    const { id, title, language, classroom } = course;

    return (
        <Table.Row>
            <Items>{id}</Items>
            <Items>{title}</Items>
            <Items>{language}</Items>
            <Items>{classroom}</Items>
            <Items>
                <LinkBtn size="small" href={route("courses.show", id)}>
                    Detail
                </LinkBtn>
            </Items>
        </Table.Row>
    );
}

export default Subject;
