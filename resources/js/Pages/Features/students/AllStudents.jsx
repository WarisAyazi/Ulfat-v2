import styled from "styled-components";
import StudentsRow from "./StudentsRow";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

const Table = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
    margin-top: 5rem;
`;

const TableHeader = styled.header`
    /* display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center; */

    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: var(--color-grey-200);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

function AllStudents({ students }) {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Teacher</Heading>
                <p>Filter/sort</p>
            </Row>
            {/* <Row type="horizontal"> */}
            <Table role="table">
                <TableHeader>
                    <div>ID</div>
                    <div>Name</div>
                    <div>Fname</div>
                    <div>Gander</div>
                    <div>Action</div>
                </TableHeader>
                {students.map((student) => (
                    <StudentsRow student={student} key={student.id} />
                ))}
            </Table>
            {/* </Row> */}
        </>
    );
}
AllStudents.layout = (page) => <AppLayout>{page}</AppLayout>;

export default AllStudents;
