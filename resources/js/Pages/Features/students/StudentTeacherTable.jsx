import Table from "@/ui/Table";

function StudentTeacherTable({ ctt }) {
    const uniCtt = ctt.filter(
        (obj, index, self) =>
            index === self.findIndex((o) => o.course_id === obj.course_id)
    );
    return (
        <Table columns="2fr 2fr 2fr 2fr 2fr">
            <Table.Header>
                <div>S/Name</div>
                <div>Teacher Name</div>
                <div>Course Name</div>
                <div>Time</div>

                <div>Action</div>
            </Table.Header>

            <Table.Body
                data={uniCtt}
                render={(c) => (
                    <Table.Row key={c.created_at}>
                        <div>{c.name}</div>
                        <div>{c.tname}</div>
                        <div>{c.title}</div>
                        <div>{c.time}</div>
                        <div>Action</div>
                    </Table.Row>
                )}
            ></Table.Body>
        </Table>
    );
}

export default StudentTeacherTable;
