import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { formatCurrency } from "@/utils/helpers";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const DashboardContainer = styled.div`
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
`;

const DashboardHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    animation: ${fadeIn} 0.8s ease-out;
`;

const DashboardTitle = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const DashboardSubtitle = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const StatCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    animation: ${fadeIn} 0.6s ease-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

const StatIcon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    background: ${(props) => props.background};
    color: white;
`;

const StatValue = styled.div`
    font-size: 2.5rem;
    font-weight: 800;
    color: #2d3748;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const StatLabel = styled.div`
    color: #718096;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const StatTrend = styled.div`
    color: ${(props) => (props.positive ? "#48bb78" : "#f56565")};
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.5rem;
`;

const ChartsContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const ChartCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeIn} 0.8s ease-out;
`;

const ChartHeader = styled.h3`
    color: #2d3748;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MonthlyBreakdownGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
`;

const MonthCard = styled.div`
    background: ${(props) =>
        props.isCurrent
            ? "linear-gradient(135deg, #667eea, #764ba2)"
            : "#f7fafc"};
    color: ${(props) => (props.isCurrent ? "white" : "#2d3748")};
    padding: 1.5rem 1rem;
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
`;

const MonthName = styled.div`
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
`;

const MonthAmount = styled.div`
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
`;

const MonthEnrollments = styled.div`
    font-size: 0.8rem;
    opacity: 0.8;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    margin-top: 0.5rem;
    overflow: hidden;
`;

const ProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 100%;
    background: linear-gradient(90deg, #48bb78, #38a169);
    border-radius: 4px;
    transition: width 0.5s ease;
`;

const TimeFilter = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
`;

const FilterButton = styled.button`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 50px;
    background: ${(props) =>
        props.active
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.2)"};
    color: ${(props) => (props.active ? "#667eea" : "white")};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(255, 255, 255, 0.95);
        color: #667eea;
        transform: translateY(-2px);
    }
`;

const PercentageCalculator = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;
    animation: ${fadeIn} 1s ease-out;
`;

const CalculatorHeader = styled.h3`
    color: #2d3748;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CalculatorControls = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
`;

const PercentageInput = styled.input`
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1.1rem;
    width: 120px;
    transition: all 0.3s ease;
    font-weight: 600;

    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
`;

const PercentageSlider = styled.input`
    flex: 1;
    min-width: 200px;
    height: 12px;
    border-radius: 6px;
    background: #e2e8f0;
    outline: none;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
`;

const PercentageDisplay = styled.div`
    padding: 1rem 1.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 12px;
    font-weight: 700;
    font-size: 1.2rem;
    min-width: 80px;
    text-align: center;
    animation: ${pulse} 2s infinite;
`;

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
`;

const ResultCard = styled.div`
    background: #f7fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border-left: 4px solid ${(props) => props.color};
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
    }
`;

const ResultLabel = styled.div`
    color: #718096;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const ResultValue = styled.div`
    color: #2d3748;
    font-size: 1.4rem;
    font-weight: 800;
`;

// Afghan months
const AFGHAN_MONTHS = [
    "Hamal",
    "Saur",
    "Jawza",
    "Saratan",
    "Asad",
    "Sunbula",
    "Mizan",
    "Aqrab",
    "Qaws",
    "Jadi",
    "Dalwa",
    "Hoot",
];

function BudgetDashboard({ data }) {
    const [timeFilter, setTimeFilter] = useState("yearly"); // 'monthly' or 'yearly'
    const [percentage, setPercentage] = useState(65);

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from Laravel API
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/dashboard/all-data");
                const result = await response.json();

                if (result.success) {
                    setDashboardData(result.data);
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const {
        statistics,
        monthlyData,
        yearlyData,
        durationBreakdown,
        percentageCalculations,
    } = useMemo(() => {
        if (!dashboardData || loading) {
            return {
                statistics: {
                    totalStudents: 0,
                    totalAmount: 0,
                    totalEnrollments: 0,
                    averageAmount: 0,
                    currentMonthAmount: 0,
                    currentMonthEnrollments: 0,
                },
                monthlyData: {},
                yearlyData: {},
                durationBreakdown: {},
                percentageCalculations: {
                    percentageAmount: 0,
                    remainingAmount: 0,
                    perStudentAmount: 0,
                },
            };
        }

        const {
            statistics: apiStats,
            monthlyData: apiMonthly,
            yearlyData: apiYearly,
            durationBreakdown: apiDuration,
        } = dashboardData;

        // Calculate total percentages for duration breakdown
        const totalEnrollments = apiStats.totalEnrollments || 1;
        const totalAmount = apiStats.totalAmount || 1;

        const enhancedDurationBreakdown = { ...apiDuration };
        Object.keys(enhancedDurationBreakdown).forEach((duration) => {
            const data = enhancedDurationBreakdown[duration];
            data.percentage = Math.round((data.count / totalEnrollments) * 100);
            data.amount_percentage = Math.round(
                (data.total_amount / totalAmount) * 100
            );
        });

        // Current month
        const currentMonth = new Date().toLocaleString("en-US", {
            month: "long",
        });
        const currentMonthData = apiMonthly[currentMonth] || {
            amount: 0,
            count: 0,
        };

        // Percentage calculations
        const percentageAmount = (apiStats.totalAmount * percentage) / 100;
        const remainingAmount = apiStats.totalAmount - percentageAmount;
        const perStudentAmount =
            apiStats.totalStudents > 0
                ? percentageAmount / apiStats.totalStudents
                : 0;
        return {
            statistics: {
                ...apiStats,
                currentMonthAmount: currentMonthData.amount,
                currentMonthEnrollments: currentMonthData.count,
            },
            monthlyData: apiMonthly,
            yearlyData: apiYearly,
            durationBreakdown: enhancedDurationBreakdown,
            percentageCalculations: {
                percentageAmount,
                remainingAmount,
                perStudentAmount,
            },
        };
    }, [dashboardData, percentage, loading]);

    const handlePercentageChange = (e) => {
        const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
        setPercentage(value);
    };

    const handleSliderChange = (e) => {
        setPercentage(parseInt(e.target.value));
    };

    // Calculate progress percentage for current month
    const maxMonthlyAmount = Math.max(
        ...Object.values(monthlyData).map((m) => m.amount),
        1
    );
    const currentMonthProgress =
        (statistics.currentMonthAmount / maxMonthlyAmount) * 100;

    return (
        <DashboardContainer>
            <DashboardHeader>
                <DashboardTitle>🎓 Student Budget Dashboard</DashboardTitle>
                <DashboardSubtitle>
                    Comprehensive overview with duration-based analytics
                </DashboardSubtitle>
            </DashboardHeader>

            {/* Duration Breakdown Section */}
            <ChartCard>
                <ChartHeader>📊 Enrollment Duration Analysis</ChartHeader>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {Object.entries(durationBreakdown).map(
                        ([duration, data]) => (
                            <div
                                key={duration}
                                style={{
                                    background:
                                        "linear-gradient(135deg, #667eea, #764ba2)",
                                    color: "white",
                                    padding: "1.5rem",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "2rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {duration === "Monthly" && "📅"}
                                    {duration === "Semesterly" && "🎓"}
                                    {duration === "All Package" && "⭐"}
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {data.count}
                                </div>
                                <div
                                    style={{ fontSize: "0.9rem", opacity: 0.9 }}
                                >
                                    {duration} Enrollments
                                </div>
                                <div
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "bold",
                                        marginTop: "0.5rem",
                                    }}
                                >
                                    {formatCurrency(data.total_amount)}
                                </div>
                                <div
                                    style={{ fontSize: "0.8rem", opacity: 0.9 }}
                                >
                                    {data.percentage}% of total •{" "}
                                    {data.amount_percentage}% of revenue
                                </div>
                            </div>
                        )
                    )}
                </div>
            </ChartCard>

            <TimeFilter>
                <FilterButton
                    active={timeFilter === "monthly"}
                    onClick={() => setTimeFilter("monthly")}
                >
                    📅 Monthly View
                </FilterButton>
                <FilterButton
                    active={timeFilter === "yearly"}
                    onClick={() => setTimeFilter("yearly")}
                >
                    📊 Yearly View
                </FilterButton>
            </TimeFilter>

            {/* Key Statistics */}
            <StatsGrid>
                <StatCard>
                    <StatIcon background="linear-gradient(135deg, #667eea, #764ba2)">
                        👥
                    </StatIcon>
                    <StatValue>{statistics.totalStudents}</StatValue>
                    <StatLabel>Total Students</StatLabel>
                    <StatTrend positive>+12% this year</StatTrend>
                </StatCard>

                <StatCard>
                    <StatIcon background="linear-gradient(135deg, #f093fb, #f5576c)">
                        💰
                    </StatIcon>
                    <StatValue>
                        {formatCurrency(statistics.totalAmount)}
                    </StatValue>
                    <StatLabel>Total Revenue</StatLabel>
                    <StatTrend positive>+18% growth</StatTrend>
                </StatCard>

                <StatCard>
                    <StatIcon background="linear-gradient(135deg, #4facfe, #00f2fe)">
                        📚
                    </StatIcon>
                    <StatValue>{statistics.totalEnrollments}</StatValue>
                    <StatLabel>Total Enrollments</StatLabel>
                    <StatTrend positive>+8% this month</StatTrend>
                </StatCard>

                <StatCard>
                    <StatIcon background="linear-gradient(135deg, #43e97b, #38f9d7)">
                        📊
                    </StatIcon>
                    <StatValue>
                        {formatCurrency(statistics.averageAmount)}
                    </StatValue>
                    <StatLabel>Average per Enrollment</StatLabel>
                    <StatTrend positive>+5% increase</StatTrend>
                </StatCard>
            </StatsGrid>

            <ChartsContainer>
                {/* Monthly Breakdown */}
                <ChartCard>
                    <ChartHeader>📅 Monthly Revenue Breakdown</ChartHeader>
                    <MonthlyBreakdownGrid>
                        {AFGHAN_MONTHS.map((month) => {
                            const monthData = monthlyData[month] || {
                                amount: 0,
                                count: 0,
                            };
                            const isCurrent = month === "Hamal"; // Assuming current month

                            return (
                                <MonthCard key={month} isCurrent={isCurrent}>
                                    <MonthName>{month}</MonthName>
                                    <MonthAmount>
                                        {formatCurrency(monthData.amount)}
                                    </MonthAmount>
                                    <MonthEnrollments>
                                        {monthData.count} enrollments
                                    </MonthEnrollments>
                                    {isCurrent && (
                                        <ProgressBar>
                                            <ProgressFill
                                                percentage={
                                                    currentMonthProgress
                                                }
                                            />
                                        </ProgressBar>
                                    )}
                                </MonthCard>
                            );
                        })}
                    </MonthlyBreakdownGrid>
                </ChartCard>

                {/* Yearly Summary */}
                <ChartCard>
                    <ChartHeader>📊 Yearly Summary</ChartHeader>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <StatValue
                            style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                        >
                            {formatCurrency(statistics.totalAmount)}
                        </StatValue>
                        <StatLabel>Total Revenue This Year</StatLabel>
                    </div>

                    {Object.entries(yearlyData).map(([year, data]) => (
                        <div
                            key={year}
                            style={{
                                marginBottom: "1rem",
                                padding: "1rem",
                                background: "#f7fafc",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: "600",
                                        color: "#2d3748",
                                    }}
                                >
                                    Year {year}
                                </span>
                                <span
                                    style={{
                                        fontWeight: "700",
                                        color: "#667eea",
                                    }}
                                >
                                    {formatCurrency(data.amount)}
                                </span>
                            </div>
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    color: "#718096",
                                    marginTop: "0.25rem",
                                }}
                            >
                                {data.count} enrollments
                            </div>
                        </div>
                    ))}
                </ChartCard>
            </ChartsContainer>

            {/* Percentage Calculator */}
            <PercentageCalculator>
                <CalculatorHeader>
                    🧮 Revenue Distribution Calculator
                </CalculatorHeader>

                <CalculatorControls>
                    <div>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "600",
                                color: "#4a5568",
                            }}
                        >
                            Distribution Percentage:
                        </label>
                        <PercentageInput
                            type="number"
                            min="0"
                            max="100"
                            value={percentage}
                            onChange={handlePercentageChange}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: "250px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                fontWeight: "600",
                                color: "#4a5568",
                            }}
                        >
                            Adjust Distribution:
                        </label>
                        <PercentageSlider
                            type="range"
                            min="0"
                            max="100"
                            value={percentage}
                            onChange={handleSliderChange}
                        />
                    </div>

                    <PercentageDisplay>{percentage}%</PercentageDisplay>
                </CalculatorControls>

                <ResultsGrid>
                    <ResultCard color="#667eea">
                        <ResultLabel>Distributed Amount</ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.percentageAmount
                            )}
                        </ResultValue>
                    </ResultCard>

                    <ResultCard color="#f56565">
                        <ResultLabel>Remaining Balance</ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.remainingAmount
                            )}
                        </ResultValue>
                    </ResultCard>

                    <ResultCard color="#48bb78">
                        <ResultLabel>Per Student</ResultLabel>
                        <ResultValue>
                            {formatCurrency(
                                percentageCalculations.perStudentAmount
                            )}
                        </ResultValue>
                    </ResultCard>

                    <ResultCard color="#ed8936">
                        <ResultLabel>Total Base</ResultLabel>
                        <ResultValue>
                            {formatCurrency(statistics.totalAmount)}
                        </ResultValue>
                    </ResultCard>
                </ResultsGrid>
            </PercentageCalculator>
        </DashboardContainer>
    );
}

export default BudgetDashboard;
