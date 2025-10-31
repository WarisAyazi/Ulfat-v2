import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import styled, { keyframes } from "styled-components";
import { formatCurrency } from "@/utils/helpers";

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Main Container
const DashboardContainer = styled.div`
    min-height: 100vh;
    //background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

// Header
const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: 800;
    color: #555;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
    font-size: 1.4rem;
    color: #555;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

// Year Selector
const YearSelectorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    animation: ${fadeIn} 0.8s ease-out;
`;

const YearLabel = styled.span`
    font-size: 1.3rem;
    color: #555;
    font-weight: 600;
`;

const YearSelect = styled.select`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 1rem 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #374151;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 120px;

    &:hover {
        border-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
`;

const YearOption = styled.option`
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem;
`;

const YearSummary = styled.div`
    background: rgba(255, 255, 255);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 1rem 2rem;
    color: #555;
    font-size: 1.3rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

// Stats Grid
const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
`;

const StatCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 2.5rem 2rem;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${fadeIn} 0.6s ease-out;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const StatIcon = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    background: ${(props) => props.background};
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const StatValue = styled.div`
    font-size: 2.8rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
`;

const StatLabel = styled.div`
    font-size: 1.1rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const StatTrend = styled.div`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1rem;
    color: ${(props) => (props.positive ? "#10b981" : "#ef4444")};
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

// Main Content Grid
const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr;
    }
`;

// Card Components
const Card = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${slideIn} 0.8s ease-out;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

const CardTitleSection = styled.div`
    display: flex;
    align-items: center;
`;

const CardIcon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: linear-gradient(135deg, ${(props) => props.color});
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-right: 1rem;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CardTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
`;

const YearBadge = styled.div`
    background: linear-gradient(135deg, #f59e0b, #f97316);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

// Duration Cards
const DurationGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.2rem;
`;

const DurationCard = styled.div`
    background: linear-gradient(135deg, ${(props) => props.gradient});
    padding: 2rem;
    border-radius: 20px;
    color: white;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${fadeIn} 0.6s ease-out;

    &:hover {
        transform: translateX(8px) scale(1.02);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    }
`;

const DurationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;

const DurationInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const DurationIcon = styled.div`
    font-size: 2.5rem;
`;

const DurationName = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
`;

const DurationStats = styled.div`
    text-align: right;
`;

const DurationValue = styled.div`
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
`;

const DurationLabel = styled.div`
    font-size: 1rem;
    opacity: 0.9;
    font-weight: 500;
`;

const DurationDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    font-size: 1rem;
`;

const DetailItem = styled.div`
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    backdrop-filter: blur(10px);
`;

const DetailLabel = styled.div`
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

const DetailValue = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
`;

// Monthly Grid
const MonthlyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.2rem;
    max-height: 500px;
    /* overflow-y: auto; */
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
    }
`;

const MonthCard = styled.div`
    background: rgba(225, 225, 225);
    color: "#374151";
    padding: 1.8rem 1.2rem;
    border-radius: 18px;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeIn} 0.6s ease-out;

    &:hover {
        transform: translateY(-6px) scale(1.05);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
    }
`;

const MonthName = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
`;

const MonthAmount = styled.div`
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: "#1f2937";
`;

const MonthEnrollments = styled.div`
    font-size: 1rem;
    opacity: 0.7;
    font-weight: 500;
`;

// Recent Enrollments Table
const TableContainer = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${fadeIn} 1s ease-out;
`;

const TableTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1.1rem;
`;

const TableHeader = styled.thead`
    background: rgba(99, 102, 241, 0.1);
    border-radius: 12px;
`;

const TableHeaderCell = styled.th`
    padding: 1.2rem 1rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid rgba(99, 102, 241, 0.2);
`;

const TableRow = styled.tr`
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
        background: rgba(99, 102, 241, 0.05);
        transform: translateX(4px);
    }

    &:last-child {
        border-bottom: none;
    }
`;

const TableCell = styled.td`
    padding: 1.2rem 1rem;
    color: #4b5563;
    font-weight: 500;
    font-size: 1.1rem;
`;

// Badge Component
const Badge = styled.span`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: ${(props) => {
        switch (props.duration) {
            case "Monthly":
                return "linear-gradient(135deg, #3b82f6, #06b6d4)";
            case "Semesterly":
                return "linear-gradient(135deg, #10b981, #34d399)";
            case "All Package":
                return "linear-gradient(135deg, #8b5cf6, #a855f7)";
            default:
                return "linear-gradient(135deg, #667ed1, #667eed)";
        }
    }};
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

// Loading and Error States
const LoadingContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
`;

const LoadingSpinner = styled.div`
    width: 80px;
    height: 80px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingText = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
`;

const ErrorContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorCard = styled.div`
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 3rem;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${pulse} 2s ease-in-out infinite;
`;

const ErrorIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h2`
    font-size: 2rem;
    color: #1f2937;
    margin-bottom: 1rem;
    font-weight: 700;
`;

const ErrorMessage = styled.p`
    font-size: 1.2rem;
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const RetryButton = styled.button`
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
`;

// Main Dashboard Component
export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [availableYears, setAvailableYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("1404"); // Default to Hijri year
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const hasVisdted = sessionStorage.getItem("hasVisitedd");

        if (!hasVisdted) {
            sessionStorage.setItem("hasVisitedd", "ture");
            window.location.reload();
        }
    }, []);
    useEffect(() => {
        fetchDashboardData();
    }, [selectedYear]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `/api/dashboard/data?year=${selectedYear}`
            );
            const result = await response.json();

            if (result.success) {
                setDashboardData(result.data);
                if (availableYears.length === 0 && result.data.availableYears) {
                    setAvailableYears(result.data.availableYears);
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(
                "Failed to load dashboard data. Please check your connection."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const getHijriYearDisplay = (year) => {
        return `۱۴۰${year.toString().slice(-1)}`; // Convert to Persian numerals
    };

    if (loading) {
        return (
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Loading {selectedYear} Dashboard...</LoadingText>
            </LoadingContainer>
        );
    }

    if (error) {
        return (
            <ErrorContainer>
                <ErrorCard>
                    <ErrorIcon>⚠️</ErrorIcon>
                    <ErrorTitle>Dashboard Error</ErrorTitle>
                    <ErrorMessage>{error}</ErrorMessage>
                    <RetryButton onClick={fetchDashboardData}>
                        Try Again
                    </RetryButton>
                </ErrorCard>
            </ErrorContainer>
        );
    }

    const { overview, durationStats, monthlyDurationData, recentEnrollments } =
        dashboardData;

    // Generate year options based on available years or default Hijri years
    const yearOptions =
        availableYears.length > 0
            ? availableYears
            : ["1404", "1403", "1402", "1401", "1400"];

    // Afghan months
    const afghanMonths = [
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

    return (
        <>
            <Head title={`${selectedYear} Duration Analytics Dashboard`} />

            <DashboardContainer>
                <Header>
                    <Title>🎓 Eng. Hamidullah Ulfat Academic Center</Title>
                    <Subtitle>
                        Comprehensive insights into student enrollment durations
                        and revenue performance
                    </Subtitle>
                </Header>

                {/* Year Selector */}
                {/* <YearSelectorContainer>
                    <YearLabel>Viewing Data for:</YearLabel>
                    <YearSelect
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {yearOptions.map((year) => (
                            <YearOption key={year} value={year}>
                                {year} Year
                            </YearOption>
                        ))}
                    </YearSelect>
                    <YearSummary>📊 سال {selectedYear}</YearSummary>
                </YearSelectorContainer> */}

                <StatsGrid>
                    <StatCard>
                        <StatIcon background="linear-gradient(135deg, #3b82f6, #06b6d4)">
                            👥
                        </StatIcon>
                        <StatValue>{overview.totalStudents}</StatValue>
                        <StatLabel>Total Students</StatLabel>
                        <StatTrend positive={overview.studentsGrowth > 0}>
                            {overview.studentsGrowth > 0 ? "↗" : "↘"}{" "}
                            {Math.abs(overview.studentsGrowth || 0)}% vs last
                            year
                        </StatTrend>
                    </StatCard>

                    <StatCard>
                        <StatIcon background="linear-gradient(135deg, #10b981, #34d399)">
                            📚
                        </StatIcon>
                        <StatValue>{overview.totalEnrollments}</StatValue>
                        <StatLabel>Total Enrollments</StatLabel>
                        <StatTrend positive={overview.enrollmentsGrowth > 0}>
                            {overview.enrollmentsGrowth > 0 ? "↗" : "↘"}{" "}
                            {Math.abs(overview.enrollmentsGrowth || 0)}% vs last
                            year
                        </StatTrend>
                    </StatCard>

                    <StatCard>
                        <StatIcon background="linear-gradient(135deg, #f59e0b, #f97316)">
                            💰
                        </StatIcon>
                        <StatValue>
                            {formatCurrency(overview.totalRevenue)} AF
                        </StatValue>
                        <StatLabel>Total Revenue</StatLabel>
                        <StatTrend positive={overview.revenueGrowth > 0}>
                            {overview.revenueGrowth > 0 ? "↗" : "↘"}{" "}
                            {Math.abs(overview.revenueGrowth || 0)}% vs last
                            year
                        </StatTrend>
                    </StatCard>

                    <StatCard>
                        <StatIcon background="linear-gradient(135deg, #8b5cf6, #a855f7)">
                            📊
                        </StatIcon>
                        <StatValue>
                            {formatCurrency(overview.averageRevenue)} AF
                        </StatValue>
                        <StatLabel>Average per Enrollment</StatLabel>
                        <StatTrend positive={overview.averageGrowth > 0}>
                            {overview.averageGrowth > 0 ? "↗" : "↘"}{" "}
                            {Math.abs(overview.averageGrowth || 0)}% vs last
                            year
                        </StatTrend>
                    </StatCard>
                </StatsGrid>

                <ContentGrid>
                    {/* Duration Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitleSection>
                                <CardIcon color="#3b82f6, #06b6d4">🎯</CardIcon>
                                <CardTitle>Duration Performance</CardTitle>
                            </CardTitleSection>
                            <YearBadge>{selectedYear}</YearBadge>
                        </CardHeader>
                        <DurationGrid>
                            {Object.entries(durationStats).map(
                                ([duration, stats]) => (
                                    <DurationCard
                                        key={duration}
                                        gradient={getDurationGradient(duration)}
                                    >
                                        <DurationHeader>
                                            <DurationInfo>
                                                <DurationIcon>
                                                    {getDurationIcon(duration)}
                                                </DurationIcon>
                                                <DurationName>
                                                    {duration}
                                                </DurationName>
                                            </DurationInfo>
                                            <DurationStats>
                                                <DurationValue>
                                                    {stats.enrollment_count}
                                                </DurationValue>
                                                <DurationLabel>
                                                    enrollments
                                                </DurationLabel>
                                            </DurationStats>
                                        </DurationHeader>
                                        <DurationDetails>
                                            <DetailItem>
                                                <DetailLabel>
                                                    Revenue
                                                </DetailLabel>
                                                <DetailValue>
                                                    {formatCurrency(
                                                        stats.total_revenue
                                                    )}{" "}
                                                    AF
                                                </DetailValue>
                                            </DetailItem>
                                            <DetailItem>
                                                <DetailLabel>
                                                    Average
                                                </DetailLabel>
                                                <DetailValue>
                                                    {formatCurrency(
                                                        stats.average_revenue
                                                    )}{" "}
                                                    AF
                                                </DetailValue>
                                            </DetailItem>
                                            <DetailItem>
                                                <DetailLabel>
                                                    Enrollment %
                                                </DetailLabel>
                                                <DetailValue>
                                                    {
                                                        stats.enrollment_percentage
                                                    }
                                                    %
                                                </DetailValue>
                                            </DetailItem>
                                            <DetailItem>
                                                <DetailLabel>
                                                    Revenue %
                                                </DetailLabel>
                                                <DetailValue>
                                                    {stats.revenue_percentage}%
                                                </DetailValue>
                                            </DetailItem>
                                        </DurationDetails>
                                    </DurationCard>
                                )
                            )}
                        </DurationGrid>
                    </Card>

                    {/* Monthly Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitleSection>
                                <CardIcon color="#8b5cf6, #a855f7">📅</CardIcon>
                                <CardTitle>
                                    Monthly Analysis - {selectedYear}
                                </CardTitle>
                            </CardTitleSection>
                            <YearBadge>{selectedYear}</YearBadge>
                        </CardHeader>
                        <MonthlyGrid>
                            {afghanMonths.map((month) => {
                                const data = monthlyDurationData[month] || {
                                    total_enrollments: 0,
                                    total_revenue: 0,
                                };

                                return (
                                    <MonthCard key={month}>
                                        <MonthName>{month}</MonthName>
                                        <MonthAmount>
                                            {formatCurrency(data.total_revenue)}{" "}
                                            AF
                                        </MonthAmount>
                                        <MonthEnrollments>
                                            {" "}
                                            {data.total_enrollments} enrollments
                                        </MonthEnrollments>
                                    </MonthCard>
                                );
                            })}
                        </MonthlyGrid>
                    </Card>
                </ContentGrid>

                {/* Recent Enrollments */}
                <TableContainer>
                    <CardHeader>
                        <CardTitleSection>
                            <CardIcon color="#10b981, #34d399">🆕</CardIcon>
                            <CardTitle>
                                Recent Enrollments - {selectedYear}
                            </CardTitle>
                        </CardTitleSection>
                        <YearBadge>{selectedYear}</YearBadge>
                    </CardHeader>
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>Student</TableHeaderCell>
                                <TableHeaderCell>Teacher</TableHeaderCell>
                                <TableHeaderCell>Course</TableHeaderCell>
                                <TableHeaderCell>Time</TableHeaderCell>
                                <TableHeaderCell>Duration</TableHeaderCell>
                                <TableHeaderCell>Month</TableHeaderCell>
                                <TableHeaderCell>Amount</TableHeaderCell>
                                <TableHeaderCell>Date</TableHeaderCell>
                            </tr>
                        </TableHeader>
                        <tbody>
                            {recentEnrollments.map((enrollment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{enrollment.id}</TableCell>
                                    <TableCell>
                                        {enrollment.student_name}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.teacher_name}
                                    </TableCell>
                                    <TableCell>
                                        {enrollment.course_name}
                                    </TableCell>
                                    <TableCell>{enrollment.time}</TableCell>
                                    <TableCell>
                                        <Badge duration={enrollment.duration}>
                                            {enrollment.duration}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{enrollment.month}</TableCell>
                                    <TableCell>
                                        {formatCurrency(enrollment.amount)} AF
                                    </TableCell>
                                    <TableCell>
                                        <Badge>{enrollment.year}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            </DashboardContainer>
        </>
    );
}

// Helper functions
function getDurationIcon(duration) {
    switch (duration) {
        case "Monthly":
            return "📅";
        case "Semesterly":
            return "🎓";
        case "All Package":
            return "⭐";
        default:
            return "📊";
    }
}

function getDurationGradient(duration) {
    switch (duration) {
        case "Monthly":
            return "#3b82f6, #06b6d4";
        case "Semesterly":
            return "#10b981, #34d399";
        case "All Package":
            return "#8b5cf6, #a855f7";
        default:
            return "#6b7280, #9ca3af";
    }
}
