import LinkBtn from "@/ui/LinkBtn";
import styled from "styled-components";
import StudentTable from "./StudentTable";
import Row from "@/ui/Row";
import StudentTeacherTable from "./StudentTeacherTable";
import StudentFeeTable from "./StudentFeeTable";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";

const StyledBtn = styled.div`
    display: flex;
    gap: 2rem;
`;
function Student({ student, section, ctt }) {
    console.log(section);
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">{student.name} </Heading>
                <StyledBtn>
                    {/* button for printing */}
                    <LinkBtn onClick={
                        window.onmouseenter = function() {
                            window.print()
                        }
                    }>
                        Print 🖨️

                    </LinkBtn>

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
                </StyledBtn>
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
