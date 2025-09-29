import FindById from "@/ui/FindById";
import TeachersRow from "./TeachersRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";

function AllTeachers({ teachers }) {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Teachers</Heading>
                <FindById group="teacher" />
            </Row>
            <Table columns="1fr 2fr 2fr 1fr">
                <Table.Header>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Fname</div>
                    <div>Details</div>
                </Table.Header>
                <Table.Body
                    data={teachers}
                    render={(teacher) => (
                        <TeachersRow teacher={teacher} key={teacher.id} />
                    )}
                />
            </Table>
        </>
    );
}

AllTeachers.layout = (page) => <AppLayout>{page}</AppLayout>;
export default AllTeachers;
