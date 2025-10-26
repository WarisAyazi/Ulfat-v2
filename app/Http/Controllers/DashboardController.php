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
     * Get comprehensive dashboard data with duration analytics
     */
    public function getDashboardData()
    {
        try {
            // Basic statistics
            $totalStudents = Student::count();
            $totalEnrollments = Section::count();
            $totalRevenue = Enrollment::sum('amount');
            $averageRevenue = $totalEnrollments > 0 ? $totalRevenue / $totalEnrollments : 0;

            // Duration analytics
            $durationStats = $this->getDurationStats();
            $monthlyDurationData = $this->getMonthlyDurationData();
            $revenueByDuration = $this->getRevenueByDuration();
            $enrollmentTrends = $this->getEnrollmentTrends();

            // Recent activity
            $recentEnrollments = $this->getRecentEnrollments(10);

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => [
                        'totalStudents' => $totalStudents,
                        'totalEnrollments' => $totalEnrollments,
                        'totalRevenue' => (float) $totalRevenue,
                        'averageRevenue' => (float) round($averageRevenue, 2),
                    ],
                    'durationStats' => $durationStats,
                    'monthlyDurationData' => $monthlyDurationData,
                    'revenueByDuration' => $revenueByDuration,
                    'enrollmentTrends' => $enrollmentTrends,
                    'recentEnrollments' => $recentEnrollments,
                ]
            ]);

        } catch (\Exception $e) {
            // \Log::error('Dashboard error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to load dashboard data'
            ], 500);
        }
    }

    /**
     * Get detailed duration statistics
     */
    private function getDurationStats()
    {
        $stats = DB::table('enrollments')
            ->select(
                'duration',
                DB::raw('COUNT(*) as enrollment_count'),
                DB::raw('SUM(amount) as total_revenue'),
                DB::raw('AVG(amount) as average_revenue'),
                DB::raw('MAX(amount) as max_revenue'),
                DB::raw('MIN(amount) as min_revenue')
            )
            ->groupBy('duration')
            ->get();

        $totalEnrollments = $stats->sum('enrollment_count');
        $totalRevenue = $stats->sum('total_revenue');

        $result = [];
        foreach ($stats as $stat) {
            $percentage = $totalEnrollments > 0 ? ($stat->enrollment_count / $totalEnrollments) * 100 : 0;
            $revenuePercentage = $totalRevenue > 0 ? ($stat->total_revenue / $totalRevenue) * 100 : 0;

            $result[$stat->duration] = [
                'enrollment_count' => $stat->enrollment_count,
                'total_revenue' => (float) $stat->total_revenue,
                'average_revenue' => (float) round($stat->average_revenue, 2),
                'max_revenue' => (float) $stat->max_revenue,
                'min_revenue' => (float) $stat->min_revenue,
                'enrollment_percentage' => round($percentage, 1),
                'revenue_percentage' => round($revenuePercentage, 1),
            ];
        }

        // Ensure all duration types are present
        $durations = ['Monthly', 'Semesterly', 'All Package'];
        foreach ($durations as $duration) {
            if (!isset($result[$duration])) {
                $result[$duration] = [
                    'enrollment_count' => 0,
                    'total_revenue' => 0,
                    'average_revenue' => 0,
                    'max_revenue' => 0,
                    'min_revenue' => 0,
                    'enrollment_percentage' => 0,
                    'revenue_percentage' => 0,
                ];
            }
        }

        return $result;
    }

    /**
     * Get monthly data with duration breakdown
     */
    private function getMonthlyDurationData()
    {
        $months = ['Hamal', 'Saur', 'Jawza', 'Saratan', 'Asad', 'Sunbula', 'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalwa', 'Hoot'];
        
        $monthlyData = DB::table('enrollments')
            ->select(
                'month',
                'duration',
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(amount) as revenue')
            )
            ->groupBy('month', 'duration')
            ->get();

        $result = [];
        foreach ($months as $month) {
            $result[$month] = [
                'total_enrollments' => 0,
                'total_revenue' => 0,
                'durations' => []
            ];

            // Initialize all durations for this month
            foreach (['Monthly', 'Semesterly', 'All Package'] as $duration) {
                $result[$month]['durations'][$duration] = [
                    'count' => 0,
                    'revenue' => 0
                ];
            }

            // Fill with actual data
            foreach ($monthlyData as $data) {
                if ($data->month === $month) {
                    $result[$month]['total_enrollments'] += $data->count;
                    $result[$month]['total_revenue'] += $data->revenue;
                    $result[$month]['durations'][$data->duration] = [
                        'count' => $data->count,
                        'revenue' => (float) $data->revenue
                    ];
                }
            }
        }

        return $result;
    }

    /**
     * Get revenue distribution by duration
     */
    private function getRevenueByDuration()
    {
        return DB::table('enrollments')
            ->select(
                'duration',
                DB::raw('SUM(amount) as revenue'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('duration')
            ->orderBy('revenue', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'duration' => $item->duration,
                    'revenue' => (float) $item->revenue,
                    'count' => $item->count
                ];
            });
    }

    /**
     * Get enrollment trends (last 6 months)
     */
    private function getEnrollmentTrends()
    {
        $recentMonths = DB::table('enrollments')
            ->select(
                'month',
                'duration',
                DB::raw('COUNT(*) as count'),
                DB::raw('SUM(amount) as revenue')
            )
            ->groupBy('month', 'duration')
            ->orderBy('month')
            ->get();

        return $recentMonths;
    }

    /**
     * Get recent enrollments with duration info
     */
    private function getRecentEnrollments($limit = 30)
    {
        return DB::table('enrollments')
            ->join('sections', 'enrollments.id', '=', 'sections.enrollment_id')
            ->join('students', 'sections.student_id', '=', 'students.id')
            ->join('teachers', 'sections.teacher_id', '=', 'teachers.id')
            ->join('courses', 'sections.course_id', '=', 'courses.id')
            ->select(
                'students.name as student_name',
                'teachers.name as teacher_name',
                'courses.title as course_name',
                'enrollments.month',
                'enrollments.duration',
                'enrollments.amount',
                'enrollments.created_at'
            )
            ->orderBy('enrollments.created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'student_name' => $item->student_name,
                    'teacher_name' => $item->teacher_name,
                    'course_name' => $item->course_name,
                    'month' => $item->month,
                    'duration' => $item->duration,
                    'amount' => (float) $item->amount,
                    'enrolled_at' => $item->created_at,
                ];
            });
    }
}