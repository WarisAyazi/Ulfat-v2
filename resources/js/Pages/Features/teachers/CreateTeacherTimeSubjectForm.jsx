import AppLayout from "@/ui/AppLayout";

import Heading from "@/ui/Heading";

import styled from "styled-components";
import CreateTeacher from "./CreateTeacher";
import CreateSubject from "../subject/CreateSubject";
import CreateTime from "../times/CreateTime";
import Row from "@/ui/Row";

const StyledCreateTeacher = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    border-bottom: 1px solid var(--color-grey-500);
    margin-bottom: 4rem;
    padding-bottom: 4rem;
`;

const FormLayout = styled.div`
    border-right: 1px solid var(--color-grey-500);
`;

function CreateTeacherForm() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Add teacher</Heading>
            </Row>
            <StyledCreateTeacher>
                <FormLayout>
                    <CreateTeacher />
                </FormLayout>

                <div>
                    <CreateSubject />
                </div>

                <FormLayout>
                    <CreateTime />
                </FormLayout>
            </StyledCreateTeacher>
        </>
    );
}
CreateTeacherForm.layout = (page) => <AppLayout>{page}</AppLayout>;
export default CreateTeacherForm;
