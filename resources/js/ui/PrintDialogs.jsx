import StudentPrint from "@/Pages/StudentPrint";
import styled from "styled-components";
import Button from "./Button";

const PrintDialog = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
`;

const PrintDialogContent = styled.div`
    background: white;
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
`;

const PrintDialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
`;

const PrintDialogTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
`;

const PrintDialogBody = styled.div`
    padding: 1.5rem;
`;

const PrintDialogFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
`;
function PrintDialogs({ handlePrint, handleClosePrint, printData }) {
    return (
        <PrintDialog className="print-dialog">
            <PrintDialogContent>
                <PrintDialogHeader>
                    <PrintDialogTitle>
                        Student Enrollment Confirmation
                    </PrintDialogTitle>
                    <button
                        onClick={handleClosePrint}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </PrintDialogHeader>
                <PrintDialogBody>
                    <StudentPrint data={printData} />
                </PrintDialogBody>
                <PrintDialogFooter>
                    <Button variation="secondary" onClick={handleClosePrint}>
                        Close
                    </Button>
                    <Button onClick={handlePrint}>Print Confirmation</Button>
                </PrintDialogFooter>
            </PrintDialogContent>
        </PrintDialog>
    );
}

export default PrintDialogs;
