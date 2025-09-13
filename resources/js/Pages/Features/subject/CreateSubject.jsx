import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import Select from "@/ui/Select";
import { useForm } from "@inertiajs/react";
import { HiPlus } from "react-icons/hi2";
import styled from "styled-components";

const Add = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

function CreateSubject() {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        language: "",
        classroom: "",
    });

    function onCreateSubject(e) {
        console.log(data);
        e.preventDefault();
        post("/courses");
    }
    return (
        <>
            <Heading as="h2">
                <Add>
                    <span>
                        <HiPlus />
                    </span>
                    <span>Create Course</span>
                </Add>
            </Heading>
            <Form onSubmit={onCreateSubject}>
                <FormRow type="student">
                    <Label htmlFor="title">Sourse Name</Label>
                    <Input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        placeholder="Subject Name"
                    />
                </FormRow>

                <FormRow type="student">
                    <Label htmlFor="language">Subject language</Label>
                    <Select
                        id="language"
                        value={data.language}
                        onChange={(e) => setData("language", e.target.value)}
                    >
                        <option defaultChecked>Language</option>

                        <option>Dari</option>
                        <option>Pashto</option>
                    </Select>
                </FormRow>

                <FormRow type="student">
                    <Label htmlFor="classroom">Class Number</Label>
                    <Input
                        type="text"
                        id="classroom"
                        value={data.classroom}
                        onChange={(e) => setData("classroom", e.target.value)}
                        placeholder="Class Number"
                    />
                </FormRow>

                <FormRow type="teacher">
                    <Button
                        variation="secondary"
                        type="reset"
                        onClick={() => reset()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? "Saving...." : " Add Course"}
                    </Button>
                </FormRow>
            </Form>
        </>
    );
}

export default CreateSubject;
