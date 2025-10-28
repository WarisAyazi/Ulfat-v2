import { Head, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";

import AppLayout from "@/ui/AppLayout";
import Select from "@/ui/Select";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Label from "@/ui/Label";
import Row from "@/ui/Row";
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

function CreateStudentForm({ teachers, courses, times }) {
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [printData, setPrintData] = useState(null);
    const { flash } = usePage().props;

    useEffect(() => {
        const hasVisdted = sessionStorage.getItem("hasVisitedc");

        if (!hasVisdted) {
            sessionStorage.setItem("hasVisitedc", "ture");
            window.location.reload();
        }
    }, []);

    const { data, setData, post, get, reset, processing, errors } = useForm({
        name: "",
        fname: "",
        subject: "",
        language: "",
        month: "",
        time: "",
        teacher: "",
        amount: "",
        phone_number: "",
        duration: "",
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            reset();
        }

        if (flash?.error) {
            toast.error(flash.error);
        }

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

        // Remove the style after printing
        setTimeout(() => {
            document.head.removeChild(landscapeStyle);
        }, 100);
    };

    const handleClosePrint = () => {
        setShowPrintDialog(false);
        setPrintData(null);
    };

    function onSubmit(e) {
        e.preventDefault();
        post("/new-student", {
            preserveScroll: true,
            onError: () => {
                toast.error("Failed to add student 😞");
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
    if (!teachers && !courses && !times)
        return (
            <>
                <Row type="horizontal">
                    <Heading as="h1">
                        To add Student you have to first Add Teacher, Course and
                        Time.
                    </Heading>
                </Row>
            </>
        );

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Add Student</Heading>
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
                                <option value="" defaultChecked>
                                    Subject
                                </option>
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
                                <option value="" defaultChecked>
                                    language
                                </option>
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
                            {errors.duration && (
                                <p className="text-red-600">
                                    {errors.duration}
                                </p>
                            )}
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
                                <option value="" defaultChecked>
                                    {data.duration}
                                </option>
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
                                <option value="" defaultChecked>
                                    Time
                                </option>
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
                                <option value="" defaultChecked>
                                    Teacher
                                </option>
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
                                onClick={() => get(route("new-student.create"))}
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

CreateStudentForm.layout = (page) => <AppLayout>{page}</AppLayout>;

export default CreateStudentForm;
