import TimeTable from "./TimeTable";
import Row from "@/ui/Row";

import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Budget from "./Budget";

function Time({ time, section, data }) {
    console.log(section);

    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">{time.time}</Heading>
            </Row>
            <Row type="horizontal">
                <TimeTable time={time} />
            </Row>

            {section[0] && (
                <Row type="horizontal">
                    <Budget section={section} data={data} />
                </Row>
            )}
        </div>
    );
}

Time.layout = (page) => <AppLayout> {page}</AppLayout>;
export default Time;
