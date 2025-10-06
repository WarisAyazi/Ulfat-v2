import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";
import styled from "styled-components";

const StyledFull = styled.div`
    width: 100%;
`;
function TimeTable({ time }) {
    const { id, time: ttime, created_at } = time;
    return (
        <StyledFull>
            <Table columns="2fr 2fr 2fr 2fr  ">
                <Table.Header>
                    <div>ID</div>
                    <div>Time</div>

                    <div>Register</div>

                    <div>Action</div>
                </Table.Header>

                <Table.Row>
                    <div>{id}</div>
                    <div>{ttime}</div>

                    <div>{created_at}</div>
                    <div>
                        <LinkBtn size="small" href={route("times.edit", id)}>
                            Edit
                        </LinkBtn>
                    </div>
                </Table.Row>
            </Table>
        </StyledFull>
    );
}

export default TimeTable;
