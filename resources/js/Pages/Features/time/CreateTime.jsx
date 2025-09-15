import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import { useForm } from "@inertiajs/react";
import { HiPlus, HiSwatch } from "react-icons/hi2";
import styled from "styled-components";
import { MdOutlineMoreTime } from "react-icons/md";
const Add = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
function CreateTime() {
    const { data, setData, post, processing, reset, errors } = useForm({
        time: "",
    });

    function onCreateTime(e) {
        e.preventDefault();
        console.log(data);
        // post("/");
    }
    return (
        <>
            <Heading as="h2">
                <Add>
                    <span>
                        <MdOutlineMoreTime />
                    </span>
                    <span>Create Time</span>
                </Add>
            </Heading>
            <Form onSubmit={onCreateTime}>
                <FormRow type="student">
                    <Label htmlFor="time">Time</Label>
                    <Input
                        type="text"
                        id="time"
                        value={data.time}
                        onChange={(e) => setData("time", e.target.value)}
                        placeholder="Time"
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
                        {processing ? "Saving...." : " Add Time"}
                    </Button>
                </FormRow>
            </Form>
        </>
    );
}

export default CreateTime;
