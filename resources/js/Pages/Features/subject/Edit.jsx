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
import toast from "react-hot-toast";

const StyledCreateStudent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function Edit({ course }) {
    const { data, setData, put, get, processing, errors } = useForm({
        id: course.id,
        title: course.title,
        classroom: course.classroom,
    });

    function onSubmit(e) {
        e.preventDefault();
        put(route("courses.update", course.id), {
            onSuccess: () => {
                toast.success("Course Edited successfully 🎉.");
            },
            onError: () => {
                toast.error("Failed to edit Course 😞");
            },
        });
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
                            <Label htmlFor="id">Course ID</Label>
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
                            <Label htmlFor="title">Course Name</Label>
                            <Input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="text-red-600">{errors.title}</p>
                            )}
                        </FormRow>
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="classroom">Class Number</Label>
                            <Input
                                type="text"
                                id="classroom"
                                value={data.classroom}
                                onChange={(e) =>
                                    setData("classroom", e.target.value)
                                }
                            />
                            {errors.classroom && (
                                <p className="text-red-600">
                                    {errors.classroom}
                                </p>
                            )}
                        </FormRow>
                        <FormRow type="submit">
                            <Button
                                variation="secondary"
                                type="reset"
                                onClick={() =>
                                    get(route("courses.show", course.id))
                                }
                            >
                                Back
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating...." : " Update Course"}
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
