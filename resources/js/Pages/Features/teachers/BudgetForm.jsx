import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";

import { useForm } from "@inertiajs/react";
import Select from "@/ui/Select";
import styled from "styled-components";
import Label from "@/ui/Label";
import Row from "@/ui/Row";

const Flex = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: center;
`;

const Space = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
    height: 4rem;
`;
function BudgetForm({ years ,courses , times}) {
    const ly = years.filter(
        (obj, index, self) =>
            index ===
            self.findIndex((o) => o.year === obj.year)
    );

      const lcourse = courses.filter(
        (obj, index, self) =>
            index ===
            self.findIndex((o) => o.id === obj.id)
    );

      const ltime = times.filter(
        (obj, index, self) =>
            index ===
            self.findIndex((o) => o.id === obj.id)
    );
   
    
    if (ly[0] === undefined) return;
    const { data, setData, post, processing, errors } = useForm({
        id: ly[0].id,
        time: "",
        teacher: "",
        month: "",
        year: "",
        duration: "",
    });



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

    function onCreateTime(e) {
        e.preventDefault();
        post(route("TeacherBudget"));
    }
    return (
        <Form onSubmit={onCreateTime}>
            <Flex>
                <FormRow type="student">
                    <Select
                        id="course"
                        value={data.course}
                        onChange={(e) => setData("course", e.target.value)}
                    >
                        <option defaultChecked>Courses</option>

                        {lcourse.map((course) => (
                            <option value={course.id} key={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </Select>
                    {errors.course && (
                        <p className="text-red-600">{errors.course}</p>
                    )}
                </FormRow>
                <FormRow type="student">
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
                            <Label htmlFor="semesterly">Semesterly</Label>
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
                            <Label htmlFor="allPackage">All Pac...</Label>
                            <input
                                type="radio"
                                id="allPackage"
                                name="DUR"
                                value="All Package"
                                checked={data.duration === "All Package"}
                                onChange={(e) =>
                                    setData("duration", e.target.value)
                                }
                            />
                        </Space>
                    </Row>
                </FormRow>
                <FormRow type="student">
                    <Select
                        id="language"
                        value={data.language}
                        onChange={(e) => setData("language", e.target.value)}
                    >
                        <option defaultChecked>Language</option>
                        <option value="Dari">Dari</option>
                        <option value="Pashto">Pashto</option>
                    </Select>
                    {errors.language && (
                        <p className="text-red-600">{errors.language}</p>
                    )}
                </FormRow>
            </Flex>
            <Flex>
                <FormRow type="student">
                    <Select
                        id="time"
                        value={data.time}
                        onChange={(e) => setData("time", e.target.value)}
                    >
                        <option defaultChecked>Time</option>

                        {ltime.map((time) => (
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
                    <Select
                        id="month"
                        aria-label="Default select example"
                        value={data.month}
                        onChange={(e) => setData("month", e.target.value)}
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
                            <option value="All Package">All Package</option>
                        )}
                    </Select>
                    {errors.month && (
                        <p className="text-red-600">{errors.month}</p>
                    )}
                </FormRow>
                <FormRow type="student">
                    <Select
                        id="year"
                        value={data.year}
                        onChange={(e) => setData("year", e.target.value)}
                    >
                        <option defaultChecked>Year</option>
                        {ly.map((section) => (
                            <option value={section.year} key={section.year}>
                                {section.year}
                            </option>
                        ))}
                    </Select>
                    {errors.year && (
                        <p className="text-red-600">{errors.year}</p>
                    )}
                </FormRow>
                <FormRow type="student"></FormRow>
                <FormRow type="student"></FormRow>
                <FormRow type="student">
                    <Button type="submit" disabled={processing}>
                        {processing ? "Searching...." : "Search"}
                    </Button>
                </FormRow>
            </Flex>
        </Form>
    );
}

export default BudgetForm;
