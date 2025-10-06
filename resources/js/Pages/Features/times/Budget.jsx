import Heading from "@/ui/Heading";

import styled from "styled-components";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";
import AppLayout from "@/ui/AppLayout";

const StyledBudget = styled.div`
    width: 100%;
    margin-top: 5rem;
`;

function Budget({ section, data }) {
    return (
        <StyledBudget>
            <>
                <Heading as="h2">
                    <span>Time Relationship with others</span>
                </Heading>
                <BudgetForm section={section} />
                {data && <BudgetTable data={data} />}
            </>
        </StyledBudget>
    );
}

Budget.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Budget;
