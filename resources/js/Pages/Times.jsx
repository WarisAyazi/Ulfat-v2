import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import AllTimes from "./Features/times/AllTimes";

function Times() {
    return (
        <>
            <Row type="horizontal">
                <AllTimes />
            </Row>
        </>
    );
}

Times.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Times;
