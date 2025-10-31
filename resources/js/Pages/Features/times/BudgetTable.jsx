import Table from "@/ui/Table";
import { formatCurrency } from "@/utils/helpers";
import styled from "styled-components";
import React, { useMemo, useState } from "react";

const PercentageCalculator = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    border-left: 4px solid #667eea;
    margin-top: 3rem;
`;

const CalculatorHeader = styled.h3`
    margin: 0 0 1rem 0;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CalculatorControls = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

const PercentageInput = styled.input`
    padding: 0.75rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    width: 120px;
    transition: border-color 0.3s ease;

    &:focus {
        outline: none;
        border-color: #667eea;
    }
`;

const PercentageSlider = styled.input`
    flex: 1;
    min-width: 200px;
    height: 8px;
    border-radius: 4px;
    background: #e1e5e9;
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        border: none;
    }
`;

const PercentageResults = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e1e5e9;
`;

const ResultItem = styled.div`
    text-align: center;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid ${(props) => props.color || "#667eea"};
`;

const ResultLabel = styled.div`
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 0.5rem;
`;

const ResultValue = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
`;

function BudgetTable({ data }) {
    let x = 1;
    const [percentage, setPercentage] = useState(60); // Default 50%

    const { statistics, percentageCalculations } = useMemo(() => {
        if (!data || data.length === 0) {
            return {
                statistics: {
                    totalStudents: 0,
                    totalAmount: 0,
                    totalEnrollments: 0,
                    averageAmount: 0,
                    monthlyBreakdown: {},
                },
                percentageCalculations: {
                    percentageAmount: 0,
                    remainingAmount: 0,
                    perStudentAmount: 0,
                },
            };
        }

        const totalAmount = data.reduce(
            (sum, item) => sum + (parseFloat(item.amount) || 0),
            0
        );
        const uniqueStudents = data.map((item) => item.name);
        const totalStudents = uniqueStudents.length;
        const totalEnrollments = data.length;
        const averageAmount =
            totalEnrollments > 0 ? totalAmount / totalEnrollments : 0;

        const monthlyBreakdown = data.reduce((acc, item) => {
            const month = item.month;
            if (!acc[month]) {
                acc[month] = { amount: 0, count: 0 };
            }
            acc[month].amount += parseFloat(item.amount) || 0;
            acc[month].count += 1;
            return acc;
        }, {});

        // Percentage calculations
        const percentageAmount = (totalAmount * percentage) / 100;
        const remainingAmount = totalAmount - percentageAmount;
        const perStudentAmount =
            totalStudents > 0 ? percentageAmount / totalStudents : 0;

        return {
            statistics: {
                totalStudents,
                totalAmount,
                totalEnrollments,
                averageAmount,
                monthlyBreakdown,
            },
            percentageCalculations: {
                percentageAmount,
                remainingAmount,
                perStudentAmount,
            },
        };
    }, [data, percentage]);

    const handlePercentageChange = (e) => {
        const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
        setPercentage(value);
    };

    const handleSliderChange = (e) => {
        setPercentage(parseInt(e.target.value));
    };
    return (
        <div>
            <PercentageCalculator>
                <CalculatorHeader>
                    🧮 Course Amount Percentage Calculator
                </CalculatorHeader>

                <CalculatorControls>
                    <div>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "500",
                                color: "#555",
                            }}
                        >
                            Percentage (%):
                        </label>
                        <PercentageInput
                            type="number"
                            min="0"
                            max="100"
                            value={percentage}
                            onChange={handlePercentageChange}
                            placeholder="Enter percentage"
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: "250px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "500",
                                color: "#555",
                            }}
                        >
                            Adjust Percentage:
                        </label>
                        <PercentageSlider
                            type="range"
                            min="0"
                            max="100"
                            value={percentage}
                            onChange={handleSliderChange}
                        />
                    </div>

                    <div
                        style={{
                            padding: "0.75rem 1rem",
                            backgroundColor: "#667eea",
                            color: "white",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            minWidth: "80px",
                            textAlign: "center",
                        }}
                    >
                        {percentage}%
                    </div>
                </CalculatorControls>

                {/* Percentage Results */}
                <PercentageResults>
                    <ResultItem color="#667eea">
                        <ResultLabel>{percentage}% of Total</ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.percentageAmount
                            )}{" "}
                            AF
                        </ResultValue>
                    </ResultItem>

                    <ResultItem color="#f5576c">
                        <ResultLabel>Remaining Amount</ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.remainingAmount
                            )}{" "}
                            AF
                        </ResultValue>
                    </ResultItem>

                    <ResultItem color="#43e97b">
                        <ResultLabel>
                            Per Student ({statistics.totalStudents} students)
                        </ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.perStudentAmount
                            )}{" "}
                            AF
                        </ResultValue>
                    </ResultItem>

                    <ResultItem color="#ffa726">
                        <ResultLabel>Calculation Base</ResultLabel>
                        <ResultValue>
                            {formatCurrency(statistics.totalAmount)} AF
                        </ResultValue>
                    </ResultItem>
                </PercentageResults>
            </PercentageCalculator>
            <Table columns="1fr 1fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr">
                <Table.Header>
                    <div>#</div>
                    <div>ID</div>
                    <div>S/Name</div>
                    <div>T/Name</div>
                    <div>C/Name</div>
                    <div>Language</div>
                    <div>Time</div>
                    <div>Month</div>
                    <div>Amount</div>
                    <div>Date</div>
                </Table.Header>

                <Table.Body
                    data={data}
                    render={(c) => (
                        <Table.Row key={c.seid}>
                            <div>{x++}</div>
                            <div>{c.stuid}</div>
                            <div>{c.name}</div>
                            <div>{c.tname}</div>
                            <div>{c.title}</div>
                            <div>{c.language}</div>
                            <div>{c.time}</div>
                            <div>{c.month}</div>
                            <div> {formatCurrency(c.amount)} AF</div>{" "}
                            <div>{c.date}</div>
                        </Table.Row>
                    )}
                ></Table.Body>
            </Table>
        </div>
    );
}

export default BudgetTable;
