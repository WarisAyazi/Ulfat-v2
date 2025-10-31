import TimeTable from "./TimeTable";
import Row from "@/ui/Row";

import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Budget from "./Budget";

function Time({ time, years, data, teachers, courses }) {
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">{time.time}</Heading>
            </Row>
            <Row type="horizontal">
                <TimeTable time={time} />
            </Row>

            {years[0] && (
                <Row type="horizontal">
                    <Budget years={years} data={data}   teachers={teachers} courses={courses}/>
                </Row>
            )}
        </div>
    );
}

Time.layout = (page) => <AppLayout> {page}</AppLayout>;
export default Time;
