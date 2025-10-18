import Table from "@/ui/Table";
import LinkBtn from "@/ui/LinkBtn";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import styled from "styled-components";
import { formatCurrency } from "@/utils/helpers";

const StyledFull = styled.div`
    width: 100%;
`;

function StudentFeeTable({ section }) {
    return (
        <StyledFull>
            <Row type="horizontal">
                <Heading as="h2">Month and Fee</Heading>
            </Row>
            <Row type="horizontal">
                <Table columns="2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr">
                    <Table.Header>
                        <div>S/Name</div>
                        <div>Teacher Name</div>
                        <div>Course Name</div>
                        <div>Time</div>
                        <div>Month</div>
                        <div>Amount</div>
                        <div>Date</div>
                        <div>Action</div>
                    </Table.Header>

                    <Table.Body
                        data={section}
                        render={(c) => (
                            <Table.Row key={c.created_at}>
                                <div>{c.name}</div>
                                <div>{c.tname}</div>
                                <div>{c.title}</div>
                                <div>{c.time}</div>
                                <div>{c.month}</div>
                                <div>AFG {formatCurrency(c.amount)}</div>
                                <div>{c.date}</div>
                                <div>
                                    <LinkBtn
                                        size="small"
                                        href={route("enrollment.edit", c.secid)}
                                    >
                                        Edit
                                    </LinkBtn>
                                </div>
                            </Table.Row>
                        )}
                    ></Table.Body>
                </Table>
            </Row>
        </StyledFull>
    );
}

export default StudentFeeTable;
