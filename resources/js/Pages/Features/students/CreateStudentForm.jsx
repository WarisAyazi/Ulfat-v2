import styled from "styled-components";

import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";

import AppLayout from "@/ui/AppLayout";
import Select from "@/ui/Select";
import FormRow from "@/ui/FormRow";

import Label from "@/ui/Label";
import { useForm } from "@inertiajs/react";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function CreateStudentForm({ students, teachers, courses, times }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        fname: "",
        subject: "",
        gender: "",
        month: "",
        time: "",
        teacher: "",
        fee: "",
        phone_number: 0,
    });

    function onSubmit(e) {
        e.preventDefault();
        console.log(data);
        post("/new-student");
    }

    return (
        <StyledCreateStudent>
            <Form type="create" method="POST" onSubmit={onSubmit}>
                <div>
                    <FormRow type="student">
                        <Label htmlFor="name">Student name</Label>
                        <Input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Student Name"
                        />
                        {errors.name && <p>errors.name</p>}
                    </FormRow>

                    <FormRow type="student">
                        <Label htmlFor="fname">Father name</Label>
                        <Input
                            type="text"
                            id="fname"
                            value={data.fname}
                            onChange={(e) => setData("fname", e.target.value)}
                            placeholder="Father Name"
                        />
                    </FormRow>

                    <FormRow type="student">
                        <Label htmlFor="subject">Subject</Label>
                        <Select
                            id="subject"
                            aria-label="Default select example"
                            value={data.subject}
                            onChange={(e) => setData("subject", e.target.value)}
                        >
                            <option defaultChecked>Subject</option>

                            {courses.map((course) => (
                                <option value={course.title} key={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </Select>
                    </FormRow>

                    <FormRow type="student">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            id="gender"
                            aria-label="Default select example"
                            value={data.gender}
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <option defaultChecked>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Select>
                    </FormRow>
                    <FormRow type="student">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            type="number"
                            id="phone_number"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            placeholder="Phone number"
                        />
                    </FormRow>
                </div>
                <div>
                    <FormRow type="student">
                        <Label htmlFor="month">Month</Label>
                        <Select
                            id="month"
                            aria-label="Default select example"
                            value={data.month}
                            onChange={(e) => setData("month", e.target.value)}
                        >
                            <option defaultChecked>Month</option>
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
                            value={data.time}
                            onChange={(e) => setData("time", e.target.value)}
                        >
                            <option defaultChecked>Time</option>

                            {times.map((time) => (
                                <option value={time.time} key={time.id}>
                                    {time.time}
                                </option>
                            ))}
                        </Select>
                    </FormRow>

                    <FormRow type="student">
                        <Label htmlFor="teacher">Teacher</Label>
                        <Select
                            id="teacher"
                            aria-label="Default select example"
                            value={data.teacher}
                            onChange={(e) => setData("teacher", e.target.value)}
                        >
                            <option defaultChecked>Teacher</option>

                            {teachers.map((teacher) => (
                                <option value={teacher.id} key={teacher.id}>
                                    {teacher.first_name}
                                </option>
                            ))}
                        </Select>
                    </FormRow>
                    <FormRow type="student">
                        <Label htmlFor="fee">Fee</Label>
                        <Input
                            type="text"
                            id="fee"
                            value={data.fee}
                            onChange={(e) => setData("fee", e.target.value)}
                            placeholder="Fee"
                        />
                    </FormRow>
                </div>
                <FormRow>
                    <Button
                        variation="secondary"
                        type="reset"
                        onClick={() => reset()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Saving...." : " Add Student"}
                    </Button>
                </FormRow>
            </Form>
        </StyledCreateStudent>
    );
}
CreateStudentForm.layout = (page) => <AppLayout>{page}</AppLayout>;

export default CreateStudentForm;
