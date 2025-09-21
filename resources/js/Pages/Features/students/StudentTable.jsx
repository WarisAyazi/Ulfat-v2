import Table from "@/ui/Table";

function StudentTable({ student }) {
    const { id, name, fname, gender, phone_number, created_at } = student;
    return (
        <div>
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
                    <div>2025/02/12</div>
                    <div>Action</div>
                </Table.Row>
            </Table>
        </div>
    );
}

export default StudentTable;
