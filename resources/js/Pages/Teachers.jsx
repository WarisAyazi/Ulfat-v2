import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import AllTeachers from "./Features/teachers/AllTeachers";

function Teachers() {
    return (
        <>
            <Row type="horizontal">
                <AllTeachers />
            </Row>
        </>
    );
}

Teachers.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Teachers;
