import CreateStudentForm from "@/Pages/Features/students/CreateStudentForm";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Students() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1"> + Add Student</Heading>
            </Row>

            <Row type="horizontal">
                <CreateStudentForm />
            </Row>
        </>
    );
}

Students.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Students;
