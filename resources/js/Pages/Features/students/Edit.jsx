import AppLayout from "@/ui/AppLayout";
import Select from "@/ui/Select";
import FormRow from "@/ui/FormRow";

import Label from "@/ui/Label";
import { useForm } from "@inertiajs/react";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import styled from "styled-components";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function Edit({ student }) {
    const { data, setData, put, reset, processing, errors } = useForm({
        id: student.id,
        name: student.name,
        fname: student.fname,

        gender: student.gender,
        phone_number: student.phone_number,
    });

    function onSubmit(e) {
        e.preventDefault();
        put("/students", student.id);
    }
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Update Student</Heading>
            </Row>
            <StyledCreateStudent>
                <Form type="create" method="POST" onSubmit={onSubmit}>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="id">Student ID</Label>
                            <Input
                                type="text"
                                id="id"
                                value={data.id}
                                onChange={(e) => setData("id", e.target.value)}
                                disabled
                            />
                            {errors.id && (
                                <p className="text-red-600">{errors.id}</p>
                            )}
                        </FormRow>
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
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                id="gender"
                                aria-label="Default select example"
                                value={data.gender}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                            >
                                <option defaultChecked>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Select>
                            {errors.gender && (
                                <p className="text-red-600">{errors.gender}</p>
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
                        <FormRow type="submit">
                            <Button
                                variation="secondary"
                                type="reset"
                                onClick={() => reset()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Updating...."
                                    : " Update Student"}
                            </Button>
                        </FormRow>
                    </div>
                </Form>
            </StyledCreateStudent>
        </>
    );
}
Edit.layout = (page) => <AppLayout>{page}</AppLayout>;

export default Edit;
