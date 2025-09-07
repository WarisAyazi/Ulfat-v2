import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Students() {
    return (
        <Row type="horizontal">
            <Heading as="h1">All Students</Heading>
            <p>Sort / fulter</p>
        </Row>
    );
}

Students.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Students;
