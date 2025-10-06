import Table from "@/ui/Table";
import LinkBtn from "@/ui/LinkBtn";

import styled from "styled-components";

const StyledFull = styled.div`
    width: 100%;
`;
function StudentTable({ student }) {
    const { id, name, fname, gender, phone_number, created_at } = student;
    return (
        <StyledFull>
            <Table columns="1fr 2fr 2fr 2fr 2fr 2fr 2fr ">
                <Table.Header>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Father Name</div>
                    <div>Gender</div>
                    <div>Phone Number</div>
                    <div>Registration</div>
                    <div>Action</div>
                </Table.Header>

                <Table.Row>
                    <div>{id}</div>
                    <div>{name}</div>
                    <div>{fname}</div>
                    <div>{gender}</div>
                    <div>{phone_number}</div>
                    <div>{created_at}</div>
                    <div>
                        <LinkBtn size="small" href={route("students.edit", id)}>
                            Edit
                        </LinkBtn>
                    </div>
                </Table.Row>
            </Table>
        </StyledFull>
    );
}

export default StudentTable;
