import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";
import Input from "@/ui/Input";
import Label from "@/ui/Label";
import Select from "@/ui/Select";
import { useForm } from "@inertiajs/react";
import { HiUserPlus } from "react-icons/hi2";
import styled from "styled-components";

const Add = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

function CreateTeacher() {
    const { data, setData, post, reset, processing, errors } = useForm({
        name: "",
        fname: "",
        education: "",
        phone_number: 7,
    });
    console.log(errors);
    function onCreateTeacher(e) {
        e.preventDefault();
        console.log(data);
        post("/teachers");
    }
    return (
        <>
            <Heading as="h2">
                <Add>
                    <span>
                        <HiUserPlus />
                    </span>
                    <span>Add Teacher</span>
                </Add>
            </Heading>
            <Form method="POST" onSubmit={onCreateTeacher}>
                <FormRow type="student">
                    <Label htmlFor="name">Teacher name</Label>
                    <Input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Teacher Name"
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
                        onChange={(e) => setData("fname", e.target.value)}
                        placeholder="Father Name"
                    />
                    {errors.fname && (
                        <p className="text-red-600">{errors.fname}</p>
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
                        <p className="text-red-600">{errors.phone_number}</p>
                    )}
                </FormRow>

                <FormRow type="student">
                    <Label htmlFor="education">Education</Label>
                    <Select
                        id="education"
                        value={data.education}
                        onChange={(e) => setData("education", e.target.value)}
                    >
                        <option defaultChecked>Education</option>

                        <option value="bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                    </Select>
                    {errors.education && (
                        <p className="text-red-600">{errors.education}</p>
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
                        {processing ? "Saving...." : " Add Teacher"}
                    </Button>
                </FormRow>
            </Form>
        </>
    );
}

export default CreateTeacher;
