import Table from "@/ui/Table";

function BudgetTable({ data }) {
    let x = 1;
    return (
        <Table columns="1fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr">
            <Table.Header>
                <div>#</div>
                <div>S/Name</div>
                <div>T/Name</div>
                <div>C/Name</div>
                <div>Language</div>
                <div>Time</div>
                <div>Month</div>
                <div>Amount</div>
                <div>Year</div>
            </Table.Header>

            <Table.Body
                data={data}
                render={(c) => (
                    <Table.Row key={c.created_at}>
                        <div>{x++}</div>
                        <div>{c.name}</div>
                        <div>{c.tname}</div>
                        <div>{c.title}</div>
                        <div>{c.language}</div>
                        <div>{c.time}</div>
                        <div>{c.month}</div>
                        <div>{c.amount}</div>
                        <div>{c.year}</div>
                    </Table.Row>
                )}
            ></Table.Body>
        </Table>
    );
}

export default BudgetTable;
