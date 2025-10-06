import AppLayout from "@/ui/AppLayout";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import Row from "@/ui/Row";
import Select from "@/ui/Select";
import { useForm } from "@inertiajs/react";
import styled from "styled-components";

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function NewEnrollment({
    student,
    enrid,
    teachers,
    id,
    courses,
    times,
    section,
}) {
    const uniTea = teachers.filter(
        (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
    const uniTim = times.filter(
        (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );
    const uniCou = courses.filter(
        (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    );

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: student.name,
        id: student.id,
        enrid,
        subject: "",
        month: "",
        time: "",
        teacher: "",
        amount: "400",
    });

    function onSubmit(e) {
        e.preventDefault();
        if (section !== "section") post("/enrollment");
        if (section === "section") put(route("enrollment.update", id));
    }
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">
                    {section !== "section"
                        ? "Create Student"
                        : "Update Student"}
                </Heading>
            </Row>
            <StyledCreateStudent>
                <Form type="create" method="POST" onSubmit={onSubmit}>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="name">Student name</Label>
                            <Input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                disabled
                                placeholder="Student Name"
                            />
                            {errors.name && (
                                <p className="text-red-600">{errors.name}</p>
                            )}
                        </FormRow>

                        <FormRow type="student">
                            <Label htmlFor="subject">Subject</Label>
                            <Select
                                id="subject"
                                aria-label="Default select example"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                            >
                                <option defaultChecked>Subject</option>
                                {uniCou.map((course) => (
                                    <option value={course.id} key={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </Select>
                            {errors.subject && (
                                <p className="text-red-600">{errors.subject}</p>
                            )}
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="month">Month</Label>
                            <Select
                                id="month"
                                aria-label="Default select example"
                                value={data.month}
                                onChange={(e) =>
                                    setData("month", e.target.value)
                                }
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
                            {errors.month && (
                                <p className="text-red-600">{errors.month}</p>
                            )}
                        </FormRow>
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="time">Time</Label>
                            <Select
                                id="time"
                                aria-label="Default select example"
                                value={data.time}
                                onChange={(e) =>
                                    setData("time", e.target.value)
                                }
                            >
                                <option defaultChecked>Time</option>

                                {uniTim.map((time) => (
                                    <option value={time.id} key={time.id}>
                                        {time.time}
                                    </option>
                                ))}
                            </Select>
                            {errors.time && (
                                <p className="text-red-600">{errors.time}</p>
                            )}
                        </FormRow>

                        <FormRow type="student">
                            <Label htmlFor="teacher">Teacher</Label>
                            <Select
                                id="teacher"
                                aria-label="Default select example"
                                value={data.teacher}
                                onChange={(e) =>
                                    setData("teacher", e.target.value)
                                }
                            >
                                <option defaultChecked>Teacher</option>

                                {uniTea.map((teacher) => (
                                    <option value={teacher.id} key={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.teacher && (
                                <p className="text-red-600">{errors.teacher}</p>
                            )}
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="amount">Fee</Label>
                            <Input
                                type="text"
                                id="amount"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                placeholder="Fee"
                            />
                            {errors.amount && (
                                <p className="text-red-600">{errors.amount}</p>
                            )}
                        </FormRow>

                        <FormRow type="submit">
                            <Button
                                variation="secondary"
                                type="reset"
                                onClick={() => reset()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Saving...."
                                    : section !== "section"
                                    ? "Enroll"
                                    : "Update Enrollment"}
                            </Button>
                        </FormRow>
                    </div>
                </Form>
            </StyledCreateStudent>
        </>
    );
}

NewEnrollment.layout = (page) => <AppLayout>{page}</AppLayout>;

export default NewEnrollment;
