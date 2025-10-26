import AppLayout from "@/ui/AppLayout";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import Row from "@/ui/Row";
import Select from "@/ui/Select";
import { useForm, usePage } from "@inertiajs/react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import PrintDialogs from "@/ui/PrintDialogs";

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
function NewCourse({ student, teachers, courses, times }) {
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [printData, setPrintData] = useState(null);
    const { flash } = usePage().props;
    console.log(flash);

    useEffect(() => {
        if (flash?.print_data) {
            setPrintData(flash.print_data);
            setShowPrintDialog(true);
        }
    }, [flash]);

    const handlePrint = () => {
        const landscapeStyle = document.createElement("style");
        landscapeStyle.innerHTML = `
                @page {
                    size: landscape;
                    margin: 0.5in;
                }
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `;
        document.head.appendChild(landscapeStyle);

        window.print();

        setTimeout(() => {
            document.head.removeChild(landscapeStyle);
        }, 100);
    };

    const handleClosePrint = () => {
        setShowPrintDialog(false);
        setPrintData(null);
    };

    const { data, setData, post, get, processing, errors } = useForm({
        name: student.name,
        id: student.id,
        subject: 1,

        month: "",
        time: 1,
        teacher: 1,
        amount: "400",
        duration: "Monthly",
    });

    function onSubmit(e) {
        e.preventDefault();
        post("/enrollment", {
            onSuccess: () => {
                toast.success("Course added successfully 🎉.");
            },
            onError: () => {
                toast.error("Failed to add Course 😞");
            },
        });
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
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Add new Course</Heading>
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
                                {/* <option value={tname}>{tname}</option> */}

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
                                onClick={() =>
                                    get(route("students.show", student.id))
                                }
                            >
                                Back
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving...." : "Enroll"}
                            </Button>
                        </FormRow>
                    </div>
                </Form>
            </StyledCreateStudent>
            {showPrintDialog && printData && (
                <PrintDialogs
                    handlePrint={handlePrint}
                    handleClosePrint={handleClosePrint}
                    printData={printData}
                />
            )}
        </>
    );
}
NewCourse.layout = (page) => <AppLayout>{page}</AppLayout>;

export default NewCourse;
