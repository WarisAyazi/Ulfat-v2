import styled from "styled-components";

import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";

import AppLayout from "@/ui/AppLayout";
import { useForm } from "react-hook-form";
import Select from "@/ui/Select";
import FormRow from "@/ui/FormRow";
import { HiPlus } from "react-icons/hi2";
import Heading from "@/ui/Heading";
import Label from "@/ui/Label";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateStudentForm() {
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <Heading as="h2">
                <span>Add Student</span>
                <span>
                    <HiPlus />
                </span>
            </Heading>
            <Form type="create" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FormRow type="student">
                        <Label htmlFor="name">Student name</Label>
                        <Input
                            type="text"
                            id="name"
                            {...register("name")}
                            placeholder="Student Name"
                        />
                    </FormRow>

                    <FormRow type="student">
                        <Label htmlFor="fname">Father name</Label>
                        <Input
                            type="text"
                            id="fname"
                            {...register("fname")}
                            placeholder="Father Name"
                        />
                    </FormRow>
                    <FormRow type="student">
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                            id="subject"
                            aria-label="Default select example"
                            {...register("subject")}
                        >
                            <option>English</option>
                            <option>Math</option>
                        </Select>
                    </FormRow>
                    <FormRow type="student">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            id="gender"
                            aria-label="Default select example"
                            {...register("gender")}
                        >
                            <option disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                    </FormRow>
                </div>
                <div>
                    <FormRow type="student">
                        <Label htmlFor="month">Month</Label>
                        <Select
                            id="month"
                            aria-label="Default select example"
                            {...register("month")}
                        >
                            <option disabled>Month</option>
                            <option value="Hamal">1- Hamal</option>
                            <option value="Saur">2- Saur</option>
                            <option value="Jawza">3- Jawza</option>
                            <option value="Saratan">4- Saratan</option>
                            <option value="Asad">5- Asad</option>
                            <option value="Sunbula">6- Sunbula</option>
                            <option value="Mizan">7- Mizan</option>
                            <option value="Aqrab">8- Aqrab</option>
                            <option value="Qaws">9- Qaws</option>
                            <option value="Jadi">10- Jadi</option>
                            <option value="Dalwa">11- Dalwa</option>
                            <option value="Hoot">12- Hoot</option>
                        </Select>
                    </FormRow>
                    <FormRow type="student">
                        <Label htmlFor="time">Time</Label>
                        <Select
                            id="time"
                            aria-label="Default select example"
                            {...register("time")}
                        >
                            <option>08-10</option>
                            <option>10-12</option>
                        </Select>
                    </FormRow>

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
                        <Label htmlFor="fee">Fee</Label>
                        <Input
                            type="text"
                            id="fee"
                            {...register("fee")}
                            placeholder="Fee"
                        />
                    </FormRow>
                </div>
                <FormRow>
                    {/* type is an HTML attribute! */}
                    <Button variation="secondary" type="reset">
                        Cancel
                    </Button>
                    <Button>Add Student</Button>
                </FormRow>
            </Form>
        </>
    );
}
CreateStudentForm.layout = (page) => <AppLayout>{page}</AppLayout>;

export default CreateStudentForm;
