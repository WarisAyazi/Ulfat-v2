import AppLayout from "@/ui/AppLayout";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Label from "@/ui/Label";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import Heading from "@/ui/Heading";
import { HiPlus } from "react-icons/hi2";
import Button from "@/ui/Button";
import styled from "styled-components";
import Select from "@/ui/Select";
import CreateTeacher from "./CreateTeacher";
import CreateSubject from "../subject/CreateSubject";
import CreateTime from "../time/CreateTime";

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
    const { register, handleSubmit } = useForm();

    return (
        <>
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
