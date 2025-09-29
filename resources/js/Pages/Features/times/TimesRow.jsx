import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";
import styled from "styled-components";

const Items = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

function Time({ time }) {
    const { id, time: timeName } = time;
    // console.log(time.id);
    return (
        <Table.Row>
            <Items>{id}</Items>
            <Items>{timeName}</Items>
            <Items>
                <LinkBtn size="small" href={route("times.show", id)}>
                    Detail
                </LinkBtn>
            </Items>
        </Table.Row>
    );
}

export default Time;
