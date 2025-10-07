import Student from "@/Pages/Features/students/Student";
import Input from "@/ui/Input";
import Row from "@/ui/Row";
import Select from "@/ui/Select";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import styled from "styled-components";

const StyledFind = styled.div`
    border: none;
`;

const Form = styled.form`
    display: flex;
    gap: 1rem;
    width: 40rem;
`;

function FindById({ group }) {
    const { data, setData, get } = useForm({
        search: "",
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (group === "student") {
                get(route("students.index"), {
                    preserveState: true,
                    replace: true,
                });
            }
            if (group === "teacher") {
                get(route("teachers.index"), {
                    preserveState: true,
                    replace: true,
                });
            }
            if (group === "course") {
                get(route("courses.index"), {
                    preserveState: true,
                    replace: true,
                });
            }
            if (group === "time") {
                get(route("times.index"), {
                    preserveState: true,
                    replace: true,
                });
            }
        }, 200);
        return () => clearTimeout(timeout);
    }, [data.search]);

    return (
        <StyledFind>
            <Form>
                <Input
                    type="text"
                    placeholder={
                        group === "time"
                            ? "Search by Time"
                            : "Search by ID or Name"
                    }
                    onChange={(e) => {
                        setData("search", e.target.value);
                    }}
                />
            </Form>
        </StyledFind>
    );
}

export default FindById;
