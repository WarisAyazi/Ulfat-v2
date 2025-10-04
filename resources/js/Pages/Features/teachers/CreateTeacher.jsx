import AppLayout from "@/ui/AppLayout";
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

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function CreateTeacher({ teacher }) {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: "",
        fname: "",
        education: "",
        phone_number: 7,
    });
    if (teacher) console.log(teacher);
    function onCreateTeacher(e) {
        e.preventDefault();
        if (!teacher) post("/teachers");
        if (teacher) put("/teachers");
    }
    return (
        <>
            <Heading as="h2">
                <Add>
                    <span>
                        <HiUserPlus />
                    </span>
                    <span>{!teacher ? "Add Teacher" : "Update Teacher"}</span>
                </Add>
            </Heading>

            <Form method="POST" onSubmit={onCreateTeacher}>
                <FormRow type={!teacher ? "student" : "teacher"}>
                    <Label htmlFor="name">Teacher name</Label>
                    <Input
                        type="text"
                        id="name"
                        value={teacher ? teacher.name : data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Teacher Name"
                    />
                    {errors.name && (
                        <p className="text-red-600">{errors.name}</p>
                    )}
                </FormRow>
                <FormRow type={!teacher ? "student" : "teacher"}>
                    <Label htmlFor="fname">Father name</Label>
                    <Input
                        type="text"
                        id="fname"
                        value={teacher ? teacher.fname : data.fname}
                        onChange={(e) => setData("fname", e.target.value)}
                        placeholder="Father Name"
                    />
                    {errors.fname && (
                        <p className="text-red-600">{errors.fname}</p>
                    )}
                </FormRow>

                <FormRow type={!teacher ? "student" : "teacher"}>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                        type="number"
                        id="phone_number"
                        value={
                            teacher ? teacher.phone_number : data.phone_number
                        }
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                        placeholder="Phone number"
                    />
                    {errors.phone_number && (
                        <p className="text-red-600">{errors.phone_number}</p>
                    )}
                </FormRow>

                <FormRow type={!teacher ? "student" : "teacher"}>
                    <Label htmlFor="education">Education</Label>
                    <Select
                        id="education"
                        value={teacher ? teacher.education : data.education}
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
                        {processing
                            ? teacher
                                ? "Updating"
                                : "Saving...."
                            : teacher
                            ? "Update Teacher"
                            : " Add Teacher"}
                    </Button>
                </FormRow>
            </Form>
        </>
    );
}
CreateTeacher.layout = (page) => <AppLayout>{page}</AppLayout>;
export default CreateTeacher;
