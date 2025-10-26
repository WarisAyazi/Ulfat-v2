<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Teacher;
use App\Models\Course;
use App\Models\Time;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard
     */
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    /**
     * Get comprehensive statistics for the dashboard
     */
    public function getStatistics(Request $request)
    {
        try {
            // Total Students
            $totalStudents = Student::count();

            // Total Amount from all enrollments
            $totalAmount = Enrollment::sum('amount');

            // Total Enrollments (through sections)
            $totalEnrollments = Section::count();

            // Average amount per enrollment
            $averageAmount = $totalEnrollments > 0 ? $totalAmount / $totalEnrollments : 0;

            // Current month statistics (assuming current month is Hamal for demo)
            $currentMonth = 'Hamal';
            $currentMonthData = $this->getMonthData($currentMonth);

            // Monthly growth (compared to previous month)
            $previousMonth = 'Hoot'; // Assuming previous month
            $previousMonthData = $this->getMonthData($previousMonth);
            
            $monthlyGrowth = $previousMonthData['amount'] > 0 
                ? (($currentMonthData['amount'] - $previousMonthData['amount']) / $previousMonthData['amount']) * 100 
                : 0;

            // Yearly growth
            $currentYear = now()->year;
            $previousYear = $currentYear - 1;
            
            $currentYearAmount = $this->getYearAmount($currentYear);
            $previousYearAmount = $this->getYearAmount($previousYear);
            
            $yearlyGrowth = $previousYearAmount > 0 
                ? (($currentYearAmount - $previousYearAmount) / $previousYearAmount) * 100 
                : 0;

            return response()->json([
                'success' => true,
                'data' => [
                    'totalStudents' => $totalStudents,
                    'totalAmount' => (float) $totalAmount,
                    'totalEnrollments' => $totalEnrollments,
                    'averageAmount' => (float) $averageAmount,
                    'currentMonthAmount' => $currentMonthData['amount'],
                    'currentMonthEnrollments' => $currentMonthData['count'],
                    'monthlyGrowth' => (float) $monthlyGrowth,
                    'yearlyGrowth' => (float) $yearlyGrowth,
                    'currentYearAmount' => $currentYearAmount,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get monthly breakdown data
     */
    public function getMonthlyData()
    {
        try {
            $monthlyData = DB::table('sections')
                ->join('enrollments', 'sections.enrollment_id', '=', 'enrollments.id')
                ->select(
                    'enrollments.month',
                    DB::raw('SUM(enrollments.amount) as total_amount'),
                    DB::raw('COUNT(sections.id) as enrollment_count')
                )
                ->groupBy('enrollments.month')
                ->get()
                ->keyBy('month');

            // Afghan months with default values
            $afghanMonths = ['Hamal', 'Saur', 'Jawza', 'Saratan', 'Asad', 'Sunbula', 'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalwa', 'Hoot'];
            
            $formattedData = [];
            foreach ($afghanMonths as $month) {
                $monthData = $monthlyData->get($month);
                $formattedData[$month] = [
                    'amount' => $monthData ? (float) $monthData->total_amount : 0,
                    'count' => $monthData ? $monthData->enrollment_count : 0
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $formattedData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch monthly data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get yearly breakdown data
     */
    public function getYearlyData()
    {
        try {
            $yearlyData = DB::table('sections')
                ->join('enrollments', 'sections.enrollment_id', '=', 'enrollments.id')
                ->select(
                    DB::raw('YEAR(enrollments.created_at) as year'),
                    DB::raw('SUM(enrollments.amount) as total_amount'),
                    DB::raw('COUNT(sections.id) as enrollment_count')
                )
                ->groupBy(DB::raw('YEAR(enrollments.created_at)'))
                ->orderBy('year', 'desc')
                ->get()
                ->keyBy('year');

            return response()->json([
                'success' => true,
                'data' => $yearlyData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch yearly data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all dashboard data in one request
     */
    public function getAllData()
    {
        try {
            $statistics = $this->getStatisticsData();
            $monthlyData = $this->getMonthlyData()->getData()->data;
            $yearlyData = $this->getYearlyData()->getData()->data;

            return response()->json([
                'success' => true,
                'data' => [
                    'statistics' => $statistics,
                    'monthlyData' => $monthlyData,
                    'yearlyData' => $yearlyData
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Helper method to get month data
     */
    private function getMonthData($month)
    {
        $data = DB::table('sections')
            ->join('enrollments', 'sections.enrollment_id', '=', 'enrollments.id')
            ->where('enrollments.month', $month)
            ->select(
                DB::raw('COALESCE(SUM(enrollments.amount), 0) as total_amount'),
                DB::raw('COUNT(sections.id) as enrollment_count')
            )
            ->first();

        return [
            'amount' => (float) ($data->total_amount ?? 0),
            'count' => $data->enrollment_count ?? 0
        ];
    }

    /**
     * Helper method to get year amount
     */
    private function getYearAmount($year)
    {
        $data = DB::table('enrollments')
            ->whereYear('created_at', $year)
            ->sum('amount');

        return (float) ($data ?? 0);
    }

    /**
     * Helper method for statistics data
     */
    private function getStatisticsData()
    {
        $totalStudents = Student::count();
        $totalAmount = Enrollment::sum('amount');
        $totalEnrollments = Section::count();
        $averageAmount = $totalEnrollments > 0 ? $totalAmount / $totalEnrollments : 0;

        return [
            'totalStudents' => $totalStudents,
            'totalAmount' => (float) $totalAmount,
            'totalEnrollments' => $totalEnrollments,
            'averageAmount' => (float) $averageAmount,
        ];
    }
}