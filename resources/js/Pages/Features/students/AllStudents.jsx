import StudentsRow from "./StudentsRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";
import FindStudentForm from "./FindStudentForm";

function AllStudents({ students }) {
    console.log(students);
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Students</Heading>
                <FindStudentForm />
            </Row>
            <Table columns="1fr 2fr 2fr 1fr 1fr ">
                <Table.Header>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Fname</div>
                    <div>Gander</div>
                    <div>Action</div>
                </Table.Header>
                <Table.Body
                    data={students}
                    render={(student) => (
                        <StudentsRow student={student} key={student.id} />
                    )}
                />
            </Table>
        </>
    );
}
AllStudents.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AllStudents;
