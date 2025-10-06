<?php

namespace App\Http\Controllers;

use App\Models\BaseModel;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Time;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Exception;
use Morilog\Jalali\Jalalian;

class newController extends Controller
{
     public function newEnrollment($id): Response
    {
        $student = Student::findOrFail($id);
        $courses= DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->select('courses.title', 'courses.id')
            ->where('students.id', '=',$id)->get();

            $times= DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->select('times.time', 'times.id')
            ->where('students.id', '=',$id)->get();

            $teachers= DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->select('teachers.name', 'teachers.id')
            ->where('students.id', '=',$id)->get();

        return Inertia::render('Features/students/NewEnrollment', [
            'student' => $student,
            'teachers'=>$teachers,
            'times'=>$times,
            'courses'=>$courses,
        ]); 
    }

    public function newCourse($id)  {
        $student = Student::findOrFail($id);
        $teachers = Teacher::all();
        $courses = Course::all();
        $times = Time::all();
        return Inertia::render('Features/students/NewCourse', [
            'teachers' => $teachers,
            'courses' => $courses,
            'times' => $times,
            'student' => $student
        ]);
             
    }

    public function CourseBudget(Request $request)
    {
        $request->validate([
            'teacher'=> 'required',
            'time'=>'required',
            'month'=>'required',
            'year'=> 'required'
        ]);


          $section = DB::table('courses')
            ->join('sections', 'courses.id', '=', 'sections.course_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('times', 'times.id', '=',  'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('courses.*',  'enrollments.created_at as year', 'students.name as sname' , 'teachers.name as tname', 'times.time' , 'sections.id as seid' )
            ->where('courses.id','=' ,$request->id)
            ->get() ->map(function ($item) {
                    if (isset($item->year)) {
                        $item->year = Jalalian::fromCarbon(Carbon::parse($item->created_at))->format('Y');
                    }
                    return $item;
                });;

         $data = DB::table('courses')
            ->join('sections', 'courses.id', '=', 'sections.course_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('times', 'times.id', '=',  'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('courses.*',  'enrollments.*', 'students.name as sname' , 'teachers.name as tname', 'times.time' , 'sections.id as seid' )
            ->where('courses.id','=' ,$request->id)
            ->where('teachers.id','=' ,$request->teacher)
            ->where('times.id','=' ,$request->time)
            ->where('enrollments.month','=' ,$request->month)
            ->where('enrollments.year','=' ,$request->year)
            ->orderBy('courses.created_at','desc')
            ->get() ;
            

        $course = Course::findOrFail($request->id);

            return Inertia::render('Features/subject/Subject', [
            'data' => $data,
            'course' => $course,
            'section' => $section,
        ]);
    }

    public function TimeBudget(Request $request)
    {
        $request->validate([
            'teacher'=> 'required',
            'course'=>'required',
            'month'=>'required',
            'year'=> 'required'
        ]);


          $section = DB::table('times')
            ->join('sections', 'times.id', '=', 'sections.time_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=',  'sections.course_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('times.*',  'enrollments.year', 'students.name as sname' , 'teachers.name as tname', 'courses.title' , 'sections.id as seid' )
            ->where('times.id','=' ,$request->id)
            ->get();

         $data = DB::table('times')
            ->join('sections', 'times.id', '=', 'sections.time_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=',  'sections.course_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('times.*',  'enrollments.*', 'students.name as sname' , 'teachers.name as tname', 'courses.title' , 'sections.id as seid' )
            ->where('times.id','=' ,$request->id)
            ->where('teachers.id','=' ,$request->teacher)
            ->where('courses.id','=' ,$request->course)
            ->where('enrollments.month','=' ,$request->month)
            ->where('enrollments.year','=' ,$request->year)
            ->orderBy('times.created_at','desc')
            ->get() ;
            

        $time = Time::findOrFail($request->id);

            return Inertia::render('Features/times/Time', [
            'data' => $data,
            'time' => $time,
            'section' => $section,
        ]);
    }

     public function TeacherBudget(Request $request)
    {
        $request->validate([
            'time'=> 'required',
            'course'=>'required',
            'month'=>'required',
            'year'=> 'required'
        ]);


          $section = DB::table('teachers')
            ->join('sections', 'teachers.id', '=', 'sections.time_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->join('courses', 'courses.id', '=',  'sections.course_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('teachers.*',  'enrollments.year', 'students.name as sname' , 'times.time', 'courses.title' , 'sections.id as seid' )
            ->where('teachers.id','=' ,$request->id)
            ->get();

        $data = DB::table('teachers')
    ->join('sections', 'teachers.id', '=', 'sections.teacher_id')
    ->join('students', 'students.id', '=', 'sections.student_id')
    ->join('courses', 'courses.id', '=', 'sections.course_id')
    ->join('times', 'times.id', '=', 'sections.time_id')
    ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
    ->select(
        'teachers.*',
        'enrollments.*',
        'students.name as sname',
        'times.time',
        'courses.title',
        'sections.id as seid'
    )
    ->where('teachers.id', '=', $request->id)
    ->where('times.id', '=', $request->time)
    ->where('courses.id', '=', $request->course)
    ->where('enrollments.month', '=', $request->month)
    ->where('enrollments.year', '=', $request->year)
    ->orderBy('teachers.created_at', 'desc')
    ->get();
            

        $teacher = Teacher::findOrFail($request->id);

            return Inertia::render('Features/teachers/Teacher', [
            'data' => $data,
            'teacher' => $teacher,
            'section' => $section,
        ]);
    }
    

}

