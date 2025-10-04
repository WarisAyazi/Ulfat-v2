import FindById from "@/ui/FindById";
import SubjectsRow from "./SubjectsRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";

import styled from "styled-components";

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
`;

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
                {courses[0] === undefined ? (
                    <Center>
                        <p>No course could be found</p>
                    </Center>
                ) : (
                    <Table.Body
                        data={courses}
                        render={(course) => (
                            <SubjectsRow course={course} key={course.id} />
                        )}
                    />
                )}
            </Table>
        </>
    );
}

AllSubjects.layout = (page) => <AppLayout>{page}</AppLayout>;
export default AllSubjects;
