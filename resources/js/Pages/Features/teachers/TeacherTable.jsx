import LinkBtn from "@/ui/LinkBtn";
import Table from "@/ui/Table";

function TeacherTable({ teacher }) {
    const { id, name, fname, education, phone_number, created_at } = teacher;
    return (
        <div>
            <Table columns="1fr 2fr 2fr 2fr 2fr 2fr 2fr ">
                <Table.Header>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Father Name</div>
                    <div>Education</div>
                    <div>Phone Number</div>
                    <div>Registration</div>
                    <div>Action</div>
                </Table.Header>

                <Table.Row>
                    <div>{id}</div>
                    <div>{name}</div>
                    <div>{fname}</div>
                    <div>{education}</div>
                    <div>{phone_number}</div>
                    <div>{created_at}</div>
                    <div>
                        <LinkBtn size="small" href={route("teachers.edit", id)}>
                            Edit
                        </LinkBtn>
                    </div>
                </Table.Row>
            </Table>
        </div>
    );
}

export default TeacherTable;
