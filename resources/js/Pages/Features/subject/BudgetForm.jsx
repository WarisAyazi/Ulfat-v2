import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";

import { useForm } from "@inertiajs/react";
import Select from "@/ui/Select";
import styled from "styled-components";

const Flex = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
`;
function BudgetForm({ section }) {
    const ctt = section.filter(
        (obj, index, self) =>
            index === self.findIndex((o) => o.course_id === obj.course_id)
    );
    if (ctt[0] === undefined) return;
    const { data, setData, post, processing, reset, errors } = useForm({
        id: ctt[0].id,
        time: 1,
        teacher: 1,
        month: "Hamal",
        year: "",
    });

    function onCreateTime(e) {
        e.preventDefault();
        post(route("CourseBudget"));
    }
    return (
        <Form onSubmit={onCreateTime}>
            <Flex>
                <FormRow type="student">
                    <Select
                        id="teacher"
                        value={data.teacher}
                        onChange={(e) => setData("teacher", e.target.value)}
                    >
                        <option defaultChecked>Teacher</option>

                        {ctt.map((teacher) => (
                            <option value={teacher.id} key={teacher.id}>
                                {teacher.tname}
                            </option>
                        ))}
                    </Select>
                    {errors.teacher && (
                        <p className="text-red-600">{errors.teacher}</p>
                    )}
                </FormRow>
                <FormRow type="student">
                    <Select
                        id="time"
                        value={data.time}
                        onChange={(e) => setData("time", e.target.value)}
                    >
                        <option defaultChecked>Time</option>
                        {ctt.map((time) => (
                            <option value={time.id} key={time.id}>
                                {time.time}
                            </option>
                        ))}
                    </Select>
                    {errors.time && (
                        <p className="text-red-600">{errors.time}</p>
                    )}
                </FormRow>
            </Flex>
            <Flex>
                <FormRow type="student">
                    <Select
                        id="month"
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
                        {ctt.map((section) => (
                            <option value={section.year} key={section.year}>
                                {section.year}
                            </option>
                        ))}
                    </Select>
                    {errors.year && (
                        <p className="text-red-600">{errors.time}</p>
                    )}
                </FormRow>

                <FormRow type="teacher">
                    <Button type="submit" disabled={processing}>
                        {processing ? "Searching...." : "Search"}
                    </Button>
                </FormRow>
            </Flex>
        </Form>
    );
}

export default BudgetForm;
