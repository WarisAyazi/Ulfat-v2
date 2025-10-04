import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Heading from "@/ui/Heading";

import { useForm } from "@inertiajs/react";
import styled from "styled-components";
import Select from "@/ui/Select";

const Flex = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    align-items: center;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
`;

const StyledBudget = styled.div`
    width: 100%;
    margin-top: 5rem;
`;

function Budget() {
    const { data, setData, post, processing, reset, errors } = useForm({
        time: "",
    });

    function onCreateTime(e) {
        e.preventDefault();
        post("/times");
    }
    return (
        <StyledBudget>
            <>
                <Heading as="h2">
                    <span>{!false ? "Add Teacher" : "Update Teacher"}</span>
                </Heading>
                <Form onSubmit={onCreateTime}>
                    <Flex>
                        <FormRow type="student">
                            <Select
                                id="language"
                                value={data.language}
                                onChange={(e) =>
                                    setData("language", e.target.value)
                                }
                            >
                                <option defaultChecked>Language</option>

                                <option>Dari</option>
                                <option>Pashto</option>
                            </Select>
                            {errors.language && (
                                <p className="text-red-600">
                                    {errors.language}
                                </p>
                            )}
                        </FormRow>
                        <FormRow type="student">
                            <Select
                                id="language"
                                value={data.language}
                                onChange={(e) =>
                                    setData("language", e.target.value)
                                }
                            >
                                <option defaultChecked>Language</option>

                                <option>Dari</option>
                                <option>Pashto</option>
                            </Select>
                            {errors.language && (
                                <p className="text-red-600">
                                    {errors.language}
                                </p>
                            )}
                        </FormRow>

                        <FormRow type="teacher">
                            <Button
                                // size="small"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Saving...." : " Add Time"}
                            </Button>
                        </FormRow>
                    </Flex>
                </Form>
            </>
        </StyledBudget>
    );
}

export default Budget;
