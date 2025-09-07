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

    function onCreateTeacher(data, e) {
        e.preventDefault();
        console.log(data);
    }
    function onCreateTime(data) {
        console.log(data);
    }
    function onCreateSubject(data) {
        console.log(data);
    }
    return (
        <>
            <StyledCreateTeacher>
                <FormLayout>
                    <Heading as="h2">
                        <span>Add Teacher</span>
                        <span>
                            <HiPlus />
                        </span>
                    </Heading>
                    <Form onSubmit={handleSubmit(onCreateTeacher)}>
                        <FormRow type="student">
                            <Label htmlFor="name">Teacher Name</Label>
                            <Input
                                type="text"
                                id="name"
                                {...register("name")}
                                placeholder="Teacher Name"
                            />
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                {...register("lastName")}
                                placeholder="Last Name"
                            />
                        </FormRow>
                        <FormRow type="teacher">
                            {/* type is an HTML attribute! */}
                            <Button variation="secondary" type="reset">
                                Cancel
                            </Button>
                            <Button>Add Teacher</Button>
                        </FormRow>
                    </Form>
                </FormLayout>

                <div>
                    <Heading as="h2">
                        <span>Create Time</span>
                        <span>
                            <HiPlus />
                        </span>
                    </Heading>
                    <Form onSubmit={handleSubmit(onCreateTime)}>
                        <FormRow type="student">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                type="text"
                                id="time"
                                {...register("time")}
                                placeholder="Time"
                            />
                        </FormRow>

                        <FormRow type="teacher">
                            {/* type is an HTML attribute! */}
                            <Button variation="secondary" type="reset">
                                Cancel
                            </Button>
                            <Button>Add Time</Button>
                        </FormRow>
                    </Form>
                </div>
            </StyledCreateTeacher>

            <div>
                <Heading as="h2">
                    <span>Create Subject</span>
                    <span>
                        <HiPlus />
                    </span>
                </Heading>
                <Form onSubmit={handleSubmit(onCreateSubject)} type="create">
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="subject">Subject Name</Label>
                            <Input
                                type="text"
                                id="subject"
                                {...register("subject")}
                                placeholder="Subject Name"
                            />
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="teacher">Subject language</Label>
                            <Select
                                id="teacher"
                                aria-label="Default select example"
                                {...register("teacher")}
                            >
                                <option>Dari</option>
                                <option>Pashto</option>
                            </Select>
                        </FormRow>
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="teacher">Teacher</Label>
                            <Select
                                id="teacher"
                                aria-label="Default select example"
                                {...register("teacher")}
                            >
                                <option>Shafiq</option>
                                <option>lodin</option>
                            </Select>
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Select
                                id="time"
                                aria-label="Default select example"
                                {...register("time")}
                            >
                                <option>08-10</option>
                                <option>10-12</option>
                            </Select>
                        </FormRow>
                    </div>
                    <FormRow type="teacher">
                        {/* type is an HTML attribute! */}
                        <Button variation="secondary" type="reset">
                            Cancel
                        </Button>
                        <Button>Create Subject</Button>
                    </FormRow>
                </Form>
            </div>
        </>
    );
}
CreateTeacherForm.layout = (page) => <AppLayout>{page}</AppLayout>;
export default CreateTeacherForm;
