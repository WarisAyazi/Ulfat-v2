import FindById from "@/ui/FindById";
import SubjectsRow from "./SubjectsRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";

function AllSubjects({ courses }) {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Courses</Heading>
                <FindById group="course" />
            </Row>
            <Table columns="1fr 2fr 2fr 2fr 1fr">
                <Table.Header>
                    <div>ID</div>
                    <div>Course Name</div>
                    <div>Language</div>
                    <div>Class Number</div>
                    <div>Details</div>
                </Table.Header>
                <Table.Body
                    data={courses}
                    render={(course) => (
                        <SubjectsRow course={course} key={course.id} />
                    )}
                />
            </Table>
        </>
    );
}

AllSubjects.layout = (page) => <AppLayout>{page}</AppLayout>;
export default AllSubjects;
