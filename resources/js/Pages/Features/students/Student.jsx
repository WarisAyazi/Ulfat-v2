import LinkBtn from "@/ui/LinkBtn";
import styled from "styled-components";
import StudentTable from "./StudentTable";
import Row from "@/ui/Row";
import StudentTeacherTable from "./StudentTeacherTable";
import StudentFeeTable from "./StudentFeeTable";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";

const TableRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
    &:hover {
        background-color: var(--color-grey-100);
    }
`;

const Items = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

function Student({ student, section, ctt }) {
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">All Student</Heading>
                <div>
                    <LinkBtn
                        size="medium"
                        href={route("newEnrollment", student.id)}
                    >
                        New Enrollment
                    </LinkBtn>
                    <LinkBtn
                        size="medium"
                        variations="secondary"
                        href={route("newCourse", student.id)}
                    >
                        New Course
                    </LinkBtn>
                </div>
            </Row>
            <Row type="horizontal">
                <StudentTable student={student} />
            </Row>
            <Row type="horizontal">
                <StudentTeacherTable ctt={ctt} />
            </Row>
            <Row type="horizontal">
                <StudentFeeTable section={section} />
            </Row>
        </div>
    );
}

Student.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Student;
