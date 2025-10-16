import styled from "styled-components";

import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";

import AppLayout from "@/ui/AppLayout";
import Select from "@/ui/Select";
import FormRow from "@/ui/FormRow";

import Label from "@/ui/Label";
import { useForm } from "@inertiajs/react";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Space = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;
    width: 90%;
    height: 4rem;
`;

function CreateStudentForm({ teachers, courses, times }) {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "Hello",
        fname: "Hi",
        subject: 1,
        language: "Dari",
        month: "",
        time: 1,
        teacher: 1,
        amount: "400",
        phone_number: 33,
        duration: "Monthly",
    });

    function onSubmit(e) {
        e.preventDefault();
        post("/new-student");
    }

    const months = [
        "Hamal",
        "Saur",
        "Jawza",
        "Saratan",
        "Asad",
        "Sunbula",
        "Mizan",
        "Aqrab",
        "Qaws",
        "Jadi",
        "Dalwa",
        "Hoot",
    ];

    const semesters = ["First semester", "Second Semester", "Third Semester"];

    if (!teachers && !courses && !times)
        return (
            <>
                <Row type="horizontal">
                    <Heading as="h1">
                        To add Student you have to first Add Teacher, Course and
                        Tiem.
                    </Heading>
                </Row>
            </>
        );
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Create Student</Heading>
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
                                placeholder="Student Name"
                            />
                            {errors.name && (
                                <p className="text-red-600">{errors.name}</p>
                            )}
                        </FormRow>

                        <FormRow type="student">
                            <Label htmlFor="fname">Father name</Label>
                            <Input
                                type="text"
                                id="fname"
                                value={data.fname}
                                onChange={(e) =>
                                    setData("fname", e.target.value)
                                }
                                placeholder="Father Name"
                            />
                            {errors.fname && (
                                <p className="text-red-600">{errors.fname}</p>
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

                                {courses.map((course) => (
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
                            <Label htmlFor="language">language</Label>
                            <Select
                                id="language"
                                aria-label="Default select example"
                                value={data.language}
                                onChange={(e) =>
                                    setData("language", e.target.value)
                                }
                            >
                                <option defaultChecked>language</option>
                                <option value="Dari">Dari</option>
                                <option value="Pashto">Pashto</option>
                            </Select>
                            {errors.language && (
                                <p className="text-red-600">
                                    {errors.language}
                                </p>
                            )}
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
                            {errors.phone_number && (
                                <p className="text-red-600">
                                    {errors.phone_number}
                                </p>
                            )}
                        </FormRow>
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="monthly">Duration</Label>
                            <Row type="horizontal">
                                <Space>
                                    <Label htmlFor="monthly">Monthly</Label>
                                    <input
                                        type="radio"
                                        id="monthly"
                                        name="DUR"
                                        value="Monthly"
                                        checked={data.duration === "Monthly"}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                    />
                                </Space>
                                <Space>
                                    <Label htmlFor="semesterly">
                                        Semesterly
                                    </Label>
                                    <input
                                        type="radio"
                                        id="semesterly"
                                        name="DUR"
                                        value="Semesterly"
                                        checked={data.duration === "Semesterly"}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                    />
                                </Space>
                                <Space>
                                    <Label htmlFor="allPackage">
                                        All Package
                                    </Label>
                                    <input
                                        type="radio"
                                        id="allPackage"
                                        name="DUR"
                                        value="All Package"
                                        checked={
                                            data.duration === "All Package"
                                        }
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                    />
                                </Space>
                            </Row>
                        </FormRow>
                        <FormRow type="student">
                            <Label htmlFor="month">{data.duration}</Label>
                            <Select
                                id="month"
                                aria-label="Default select example"
                                value={data.month}
                                onChange={(e) =>
                                    setData("month", e.target.value)
                                }
                            >
                                <option defaultChecked>{data.duration}</option>

                                {data.duration === "Monthly" &&
                                    months.map((month, i) => (
                                        <option value={month} key={month}>
                                            {i + 1}- {month}
                                        </option>
                                    ))}
                                {data.duration === "Semesterly" &&
                                    semesters.map((semester, i) => (
                                        <option value={semester} key={semester}>
                                            {i + 1}- {semester}
                                        </option>
                                    ))}

                                {data.duration === "All Package" && (
                                    <option value="All Package">
                                        All Package
                                    </option>
                                )}
                            </Select>
                            {errors.month && (
                                <p className="text-red-600">{errors.month}</p>
                            )}
                        </FormRow>

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

                                {times.map((time) => (
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

                                {teachers.map((teacher) => (
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
                                {processing ? "Saving...." : " Add Student"}
                            </Button>
                        </FormRow>
                    </div>
                </Form>
            </StyledCreateStudent>
        </>
    );
}
CreateStudentForm.layout = (page) => <AppLayout>{page}</AppLayout>;

export default CreateStudentForm;
