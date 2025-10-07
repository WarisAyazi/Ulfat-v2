import AllStudents from "@/Pages/Features/students/AllStudents";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Students() {
    return (
        <>
            <Row type="horizontal">
                <AllStudents />
            </Row>
        </>
    );
}

Students.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Students;
