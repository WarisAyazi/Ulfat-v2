import TeacherTable from "./TeacherTable";
import Row from "@/ui/Row";

import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import TeacherBudget from "./Budget";

function Student({ teacher, section, ctt }) {
    // console.log(teacher);
    // console.log(section);
    // console.log(ctt);
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">All Student</Heading>
            </Row>
            <Row type="horizontal">
                <TeacherTable teacher={teacher} />
            </Row>
            {/* <Row type="horizontal">
                <StudentTeacherTable ctt={ctt} />
            </Row>
            <Row type="horizontal">
                <StudentFeeTable section={section} />
            </Row> */}
            <Row type="horizontal">
                <TeacherBudget />
            </Row>
        </div>
    );
}

Student.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Student;
