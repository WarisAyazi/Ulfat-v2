import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";
import styled from "styled-components";

const StyledFull = styled.div`
    width: 100%;
`;
function SubjectTable({ course }) {
    const { id, title, classroom, language, created_at } = course;
    return (
        <StyledFull>
            <Table columns="1fr 2fr 2fr 2fr 2fr   ">
                <Table.Header>
                    <div>ID</div>
                    <div>Class Name</div>
                    <div>Room Number</div>
                    <div>Register</div>
                    <div>Action</div>
                </Table.Header>

                <Table.Row>
                    <div>{id}</div>
                    <div>{title}</div>
                    <div>{classroom}</div>
                    <div>{created_at}</div>
                    <div>
                        <LinkBtn size="small" href={route("courses.edit", id)}>
                            Edit
                        </LinkBtn>
                    </div>
                </Table.Row>
            </Table>
        </StyledFull>
    );
}

export default SubjectTable;
