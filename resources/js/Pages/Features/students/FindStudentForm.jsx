import Input from "@/ui/Input";
import Row from "@/ui/Row";
import Select from "@/ui/Select";
import { useForm } from "@inertiajs/react";
import styled from "styled-components";

const StyledFind = styled.div`
    border: none;
`;

const Form = styled.form`
    display: flex;
    gap: 1rem;
    width: 40rem;
`;

function FindStudentForm() {
    const { data, setData, post } = useForm({
        search: "",
        type: "ID",
    });

    function handelSubmit() {
        if (data.search === "") return;
        console.log(data);
    }

    return (
        <StyledFind>
            <Form>
                <Input
                    type="text"
                    placeholder={
                        data.type !== "All"
                            ? ` Search by ${data.type}`
                            : "All Students"
                    }
                    onChange={(e) => {
                        setData("search", e.target.value);
                    }}
                    onAbort={handelSubmit()}
                    disabled={data.type === "All"}
                />
                <Select
                    // value={data.type}
                    onChange={(e) => setData("type", e.target.value)}
                >
                    <option value="ID">ID</option>
                    <option value="Name">Name</option>
                    <option value="All">All</option>
                </Select>
            </Form>
        </StyledFind>
    );
}

export default FindStudentForm;
