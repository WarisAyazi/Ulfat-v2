import TeacherTable from "./TeacherTable";
import Row from "@/ui/Row";

import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Budget from "./Budget";

function Teacher({ teacher, section, data }) {
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">{teacher.name}</Heading>
            </Row>
            <Row type="horizontal">
                <TeacherTable teacher={teacher} />
            </Row>

            {section[0] && (
                <Row type="horizontal">
                    <Budget section={section} data={data} />
                </Row>
            )}
        </div>
    );
}

Teacher.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Teacher;
