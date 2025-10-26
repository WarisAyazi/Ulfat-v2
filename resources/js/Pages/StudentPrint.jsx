import React from "react";
import styled from "styled-components";

const PrintContainer = styled.div`
    display: block;
    width: 100%;

    @media print {
        body * {
            visibility: hidden;
            margin: 0;
            padding: 0;
        }

        .print-container,
        .print-container * {
            visibility: visible;
        }

        .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            margin: 0;
            padding: 0;
            font-family: "Courier New", monospace !important;
        }

        body > *:not(.print-container) {
            display: none !important;
        }

        html,
        body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100%;
        }

        /* Zebra GT800 optimized settings */
        @page {
            size: 3.15in 8in; /* GT800 typical paper size */
            margin: 0.1in;
        }
    }
`;

const PrintContent = styled.div`
    font-family: "Courier New", monospace;
    background: white;
    color: black;
    max-width: 2.95in; /* GT800 paper width minus margins */
    margin: 0 auto;
    padding: 0.15in;
    line-height: 1.1;

    @media print {
        width: 2.95in;
        max-width: 2.95in;
        padding: 0.1in;
        background: white;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 0.15in;
    border-bottom: 2px solid black;
    padding-bottom: 0.1in;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 14pt;
    font-weight: bold;
    margin-bottom: 0.05in;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const Subtitle = styled.p`
    font-size: 10pt;
    margin-bottom: 0.05in;
    font-weight: bold;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid black;
    margin: 0.1in 0;
`;

const DoubleDivider = styled.hr`
    border: none;
    border-top: 2px solid black;
    margin: 0.1in 0;
`;

const Section = styled.div`
    margin-bottom: 0.15in;
`;

const SectionTitle = styled.h3`
    font-size: 11pt;
    font-weight: bold;
    margin-bottom: 0.08in;
    text-transform: uppercase;
    border-bottom: 1px solid black;
    padding-bottom: 0.03in;
`;

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: 1.2in 1in;
    gap: 0.05in;
    font-size: 9pt;
`;

const DetailItem = styled.div`
    display: contents;
`;

const Label = styled.span`
    font-weight: bold;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Value = styled.span`
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px dotted #ccc;
`;

const BarcodeArea = styled.div`
    text-align: center;
    margin: 0.15in 0;
    padding: 0.1in;
    border: 1px dashed black;
    background: #f9f9f9;
`;

const BarcodeText = styled.div`
    font-family: "Courier New", monospace;
    font-size: 8pt;
    letter-spacing: 1px;
    margin-top: 0.05in;
`;

const Notes = styled.div`
    margin: 0.15in 0;
    padding: 0.08in;
    border: 1px solid black;
    background: #f5f5f5;
`;

const NotesTitle = styled.h4`
    font-size: 9pt;
    font-weight: bold;
    margin-bottom: 0.05in;
    text-align: center;
    text-transform: uppercase;
`;

const NotesList = styled.ul`
    font-size: 7pt;
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 1.2;

    li {
        margin-bottom: 0.03in;
        padding-left: 0.1in;
        text-indent: -0.1in;

        &:before {
            content: "• ";
            font-weight: bold;
        }
    }
`;

const Footer = styled.div`
    margin-top: 0.15in;
    text-align: center;
`;

const SignatureGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.1in;
    margin: 0.15in 0;
`;

const SignatureBox = styled.div`
    text-align: center;
    border-top: 1px solid black;
    padding-top: 0.3in;
`;

const SignatureLabel = styled.p`
    font-size: 7pt;
    font-weight: bold;
    margin: 0.05in 0 0 0;
    text-transform: uppercase;
`;

const Watermark = styled.div`
    text-align: center;
    margin-top: 0.1in;
    padding-top: 0.05in;
    border-top: 1px solid #ccc;
`;

const GlobalPrintStyles = styled.div`
    @media print {
        .print-dialog,
        .print-dialog * {
            display: none !important;
        }

        .print-container {
            display: block !important;
            visibility: visible !important;
        }

        /* Zebra GT800 specific print settings */
        @page {
            size: 3.15in 8in;
            margin: 0.1in;
        }

        body {
            width: 3.15in;
            margin: 0 !important;
            padding: 0 !important;
            font-family: "Courier New", monospace !important;
            font-size: 9pt !important;
        }

        /* Force black and white for thermal printing */
        * {
            color: black !important;
            background: white !important;
            border-color: black !important;
        }
    }
`;

export default function StudentPrint({ data }) {
    if (!data) return null;
    console.log(data);

    return (
        <>
            <GlobalPrintStyles />
            <PrintContainer className="print-container">
                <PrintContent>
                    {/* Header */}
                    <Header>
                        <Title>Eng. Hamidullah Ulfat Academic Center</Title>
                        <Flex>
                            <div>
                                <Subtitle>ENROLLMENT CONFIRMATION</Subtitle>
                            </div>
                            <div>
                                <img src="logo.jpg" width="110px" alt="" />
                            </div>
                        </Flex>
                    </Header>

                    <DoubleDivider />

                    {/* Student Information */}
                    <Section>
                        <SectionTitle>STUDENT INFO</SectionTitle>
                        <DetailGrid>
                            <DetailItem>
                                <Label>Name:</Label>
                                <Value>{data.student.name}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Father:</Label>
                                <Value>{data.student.fname}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Phone:</Label>
                                <Value>{data.student.phone_number}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Language:</Label>
                                <Value>{data.student.language}</Value>
                            </DetailItem>
                        </DetailGrid>
                    </Section>

                    <Divider />

                    {/* Course Information */}
                    <Section>
                        <SectionTitle>COURSE DETAILS</SectionTitle>
                        <DetailGrid>
                            <DetailItem>
                                <Label>Course:</Label>
                                <Value>{data.section.course_title}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Teacher:</Label>
                                <Value>{data.section.teacher_name}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Time:</Label>
                                <Value>{data.section.time_slot}</Value>
                            </DetailItem>

                            <DetailItem>
                                <Label>Period:</Label>
                                <Value>{data.enrollment.month}</Value>
                            </DetailItem>
                            <DetailItem>
                                <Label>Amount:</Label>
                                <Value>{data.enrollment.amount} AF</Value>
                            </DetailItem>
                        </DetailGrid>
                    </Section>

                    <Divider />

                    {/* Barcode Area */}
                    <BarcodeArea>
                        <BarcodeText>
                            <Subtitle>STUDENT ID: {data.student.id}</Subtitle>{" "}
                            <Subtitle>{data.student.created_at}</Subtitle>{" "}
                        </BarcodeText>
                    </BarcodeArea>

                    <Divider />

                    {/* Important Notes */}
                    <Notes>
                        <NotesTitle>IMPORTANT NOTES</NotesTitle>
                        <NotesList>
                            <li>Present on first day of class</li>
                            <li>Contact admin for changes</li>
                            <li>The paid fee is non-refundable</li>
                        </NotesList>
                    </Notes>

                    {/* Signatures */}
                    <Footer>
                        <SignatureGrid>
                            <SignatureBox>
                                <SignatureLabel>Administration</SignatureLabel>
                            </SignatureBox>
                        </SignatureGrid>
                    </Footer>

                    {/* Watermark */}
                    <Watermark>
                        <div style={{ fontSize: "8pt", color: "#666" }}>
                            Contact us : 0777,555,836
                        </div>
                    </Watermark>
                </PrintContent>
            </PrintContainer>
        </>
    );
}
