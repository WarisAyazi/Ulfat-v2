import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Teachers() {
    return (
        <Row type="horizontal">
            <Heading as="h1">All Teacher</Heading>
            <p>TEST</p>
        </Row>
    );
}

Teachers.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Teachers;
