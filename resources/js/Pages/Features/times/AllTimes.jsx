import FindById from "@/ui/FindById";
import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Table from "@/ui/Table";
import Time from "./TimesRow";

function AllTimes({ times }) {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All Times</Heading>
                <FindById group="time" />
            </Row>
            <Table columns="2fr 2fr 1fr">
                <Table.Header>
                    <div>ID</div>
                    <div>Time</div>

                    <div>Details</div>
                </Table.Header>
                <Table.Body
                    data={times}
                    render={(time) => <Time time={time} key={time.id} />}
                />
            </Table>
        </>
    );
}

AllTimes.layout = (page) => <AppLayout>{page}</AppLayout>;
export default AllTimes;
