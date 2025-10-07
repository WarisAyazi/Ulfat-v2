import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";
import styled from "styled-components";

const StyledFull = styled.div`
    width: 100%;
`;

function StudentTeacherTable({ ctt }) {
    const uniCtt = ctt.filter(
        (obj, index, self) =>
            index === self.findIndex((o) => o.course_id === obj.course_id)
    );
    return (
        <StyledFull>
            <Row type="horizontal">
                <Heading as="h2">Teacher, Course and Time</Heading>
            </Row>
            <Row type="horizontal">
                <Table columns="1fr 1fr 1fr 1fr ">
                    <Table.Header>
                        <div>S/Name</div>
                        <div>Teacher Name</div>
                        <div>Course Name</div>
                        <div>Time</div>
                    </Table.Header>

                    <Table.Body
                        data={uniCtt}
                        render={(c) => (
                            <Table.Row key={c.created_at}>
                                <div>{c.name}</div>
                                <div>{c.tname}</div>
                                <div>{c.title}</div>
                                <div>{c.time}</div>
                            </Table.Row>
                        )}
                    ></Table.Body>
                </Table>
            </Row>
        </StyledFull>
    );
}

export default StudentTeacherTable;
