import StudentsRow from "./StudentsRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";
import FindById from "../../../ui/FindById";
import styled from "styled-components";
const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
`;

function AllStudents({ students, filters }) {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Students</Heading>
                <FindById group="student" filters={filters} />
            </Row>
            <Table columns="1fr 2fr 2fr 1fr 1fr ">
                <Table.Header>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Fname</div>
                    <div>Language</div>
                    <div>Action</div>
                </Table.Header>
                {students[0] === undefined ? (
                    <Center>
                        <p>No Student could be found</p>
                    </Center>
                ) : (
                    <Table.Body
                        data={students}
                        render={(student) => (
                            <StudentsRow student={student} key={student.id} />
                        )}
                    />
                )}
            </Table>
        </>
    );
}
AllStudents.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AllStudents;
