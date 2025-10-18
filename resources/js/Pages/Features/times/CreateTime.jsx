import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import { useForm } from "@inertiajs/react";
import styled from "styled-components";
import { MdOutlineMoreTime } from "react-icons/md";
import toast from "react-hot-toast";

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
        post("/times", {
            onSuccess: () => {
                toast.success("Time added successfully 🎉.");
            },
            onError: () => {
                toast.error("Failed to add Time 😞");
            },
        });
    }
    return (
        <>
            <Heading as="h2">
                <Add>
                    <span>
                        <MdOutlineMoreTime />
                    </span>
                    <span>Add Time</span>
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
                    {errors.time && (
                        <p className="text-red-600">{errors.time}</p>
                    )}
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
