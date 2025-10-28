<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Teacher;
use App\Models\Course;
use App\Models\Time;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Morilog\Jalali\Jalalian;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    /**
     * Get dashboard data - SIMPLIFIED VERSION
     */
    public function getDashboardData(Request $request)
    {
        try {
            $selectedYear = $request->get('year', '1404');
            
            // Get available years first
            $availableYears = $this->getAvailableYears();
            
            // If no years available, use default
            if (empty($availableYears)) {
                $availableYears = ['1404', '1403', '1402'];
            }

            // Basic statistics - using simpler queries
            $totalStudents = Student::count();
            $totalEnrollments = Section::count();
            $totalRevenue = Enrollment::sum('amount');
            $averageRevenue = $totalEnrollments > 0 ? $totalRevenue / $totalEnrollments : 0;

            // Duration analytics
            $durationStats = $this->getDurationStats();
            $monthlyData = $this->getMonthlyData();
            $recentEnrollments = $this->getRecentEnrollments(10);

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => [
                        'totalStudents' => $totalStudents,
                        'totalEnrollments' => $totalEnrollments,
                        'totalRevenue' => (float) $totalRevenue,
                        'averageRevenue' => (float) round($averageRevenue, 2),
                        'studentsGrowth' => 12.5, // Sample data
                        'enrollmentsGrowth' => 8.3, // Sample data
                        'revenueGrowth' => 15.2, // Sample data
                        'averageGrowth' => 5.7, // Sample data
                    ],
                    'durationStats' => $durationStats,
                    'monthlyDurationData' => $monthlyData,
                    'recentEnrollments' => $recentEnrollments,
                    'availableYears' => $availableYears,
                ]
            ]);

        } catch (\Exception $e) {
            // \Log::error('Dashboard error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to load dashboard data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get duration statistics - SIMPLIFIED
     */
    private function getDurationStats()
    {
        try {
            $stats = DB::table('enrollments')
                ->select(
                    'duration',
                    DB::raw('COUNT(*) as enrollment_count'),
                    DB::raw('SUM(amount) as total_revenue'),
                    DB::raw('AVG(amount) as average_revenue')
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
                        'enrollment_percentage' => 0,
                        'revenue_percentage' => 0,
                    ];
                }
            }

            return $result;

        } catch (\Exception $e) {
            // Return default data if there's an error
            return [
                'Monthly' => [
                    'enrollment_count' => 0,
                    'total_revenue' => 0,
                    'average_revenue' => 0,
                    'enrollment_percentage' => 0,
                    'revenue_percentage' => 0,
                ],
                'Semesterly' => [
                    'enrollment_count' => 0,
                    'total_revenue' => 0,
                    'average_revenue' => 0,
                    'enrollment_percentage' => 0,
                    'revenue_percentage' => 0,
                ],
                'All Package' => [
                    'enrollment_count' => 0,
                    'total_revenue' => 0,
                    'average_revenue' => 0,
                    'enrollment_percentage' => 0,
                    'revenue_percentage' => 0,
                ]
            ];
        }
    }

    /**
     * Get monthly data - SIMPLIFIED
     */
    private function getMonthlyData()
    {
        try {
            $months = ['Hamal', 'Saur', 'Jawza', 'Saratan', 'Asad', 'Sunbula', 'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalwa', 'Hoot'];
            
            $monthlyData = DB::table('enrollments')
                ->select(
                    'month',
                    DB::raw('COUNT(*) as total_enrollments'),
                    DB::raw('SUM(amount) as total_revenue')
                )
                ->groupBy('month')
                ->get()
                ->keyBy('month');

            $result = [];
            foreach ($months as $month) {
                $data = $monthlyData->get($month);
                $result[$month] = [
                    'total_enrollments' => $data ? $data->total_enrollments : 0,
                    'total_revenue' => $data ? (float) $data->total_revenue : 0,
                ];
            }

            return $result;

        } catch (\Exception $e) {
            // Return default monthly data
            $months = ['Hamal', 'Saur', 'Jawza', 'Saratan', 'Asad', 'Sunbula', 'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalwa', 'Hoot'];
            $result = [];
            foreach ($months as $month) {
                $result[$month] = [
                    'total_enrollments' => 0,
                    'total_revenue' => 0,
                ];
            }
            return $result;
        }
    }

    /**
     * Get recent enrollments - SIMPLIFIED
     */
    private function getRecentEnrollments($limit = 100)
    {
        try {
            return DB::table('enrollments')
                ->join('sections', 'enrollments.id', '=', 'sections.enrollment_id')
                ->join('students', 'sections.student_id', '=', 'students.id')
                ->join('teachers', 'sections.teacher_id', '=', 'teachers.id')
                ->join('courses', 'sections.course_id', '=', 'courses.id')
                ->join('times', 'sections.time_id', '=', 'times.id')
                ->select(
                    'students.name as student_name',
                    'teachers.name as teacher_name',
                    'courses.title as course_name',
                    'enrollments.month',
                    'enrollments.duration',
                    'enrollments.amount',
                    'enrollments.created_at',
                    'times.time',
                    'students.id',
                    DB::raw('YEAR(enrollments.created_at) as year')
                )
                ->orderBy('enrollments.created_at', 'desc')
                ->limit(300)
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'student_name' => $item->student_name,
                        'teacher_name' => $item->teacher_name,
                        'course_name' => $item->course_name,
                        'month' => $item->month,
                        'duration' => $item->duration,
                        'amount' => (float) $item->amount,
                        'time' => $item->time,
                        'year' =>  $item = Jalalian::fromCarbon(Carbon::parse($item->created_at))->format('Y-m-d h:i'),
                    ];
                });

        } catch (\Exception $e) {
            // Return empty array if there's an error
            return [];
        }
    }

    /**
     * Get available years - SIMPLIFIED
     */
    private function getAvailableYears()
    {
        try {
            // First try to get from enrollments table
            $years = DB::table('enrollments')
                ->select(DB::raw('YEAR(created_at) as year'))
                ->distinct()
                ->orderBy('year', 'desc')
                ->pluck('year')
                ->toArray();

            // If no years found, try from students table
            if (empty($years)) {
                $years = DB::table('students')
                    ->select(DB::raw('YEAR(created_at) as year'))
                    ->distinct()
                    ->orderBy('year', 'desc')
                    ->pluck('year')
                    ->toArray();
            }

            // Convert to Hijri years if needed, or return Gregorian
            return array_map(function($year) {
                // If you want to convert Gregorian to Hijri, you can do it here
                // For now, just return as is
                return (string)$year;
            }, $years);

        } catch (\Exception $e) {
            // Return default years
            return ['1404', '1403', '1402'];
        }
    }
}