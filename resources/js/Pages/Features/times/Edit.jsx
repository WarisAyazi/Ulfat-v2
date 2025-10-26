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

function Edit({ time }) {
    const { data, setData, put, get, processing, errors } = useForm({
        id: time.id,
        ttime: time.time,
    });

    function onSubmit(e) {
        e.preventDefault();
        put(route("times.update", time.id), {
            onSuccess: () => {
                toast.success("Time Edited successfully 🎉.");
            },
            onError: () => {
                toast.error("Failed to Edit Time 😞");
            },
        });
    }
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Update Time</Heading>
            </Row>
            <StyledCreateStudent>
                <Form type="create" method="POST" onSubmit={onSubmit}>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="id">Time ID</Label>
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
                    </div>
                    <div>
                        <FormRow type="student">
                            <Label htmlFor="ttime">Time</Label>
                            <Input
                                type="text"
                                id="ttime"
                                value={data.ttime}
                                onChange={(e) =>
                                    setData("ttime", e.target.value)
                                }
                            />
                            {errors.ttime && (
                                <p className="text-red-600">{errors.ttime}</p>
                            )}
                        </FormRow>
                        <FormRow type="submit">
                            <Button
                                variation="secondary"
                                type="reset"
                                onClick={() =>
                                    get(route("times.show", time.id))
                                }
                            >
                                Back
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Updating...." : " Update Time"}
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
