import SubjectTable from "./SubjectTable";
import Row from "@/ui/Row";

import AppLayout from "@/ui/AppLayout";
import Heading from "@/ui/Heading";
import Budget from "./Budget";

function Subject({ course, years, data, teachers , times }) {
    return (
        <div>
            <Row type="horizontal">
                <Heading as="h1">{course.title}</Heading>
            </Row>
            <Row type="horizontal">
                <SubjectTable course={course} />
            </Row>

            {years[0] && (
                <Row type="horizontal">
                    <Budget years={years} data={data}  teachers={teachers} times={times} />
                </Row>
            )}
        </div>
    );
}

Subject.layout = (page) => <AppLayout> {page}</AppLayout>;
export default Subject;
