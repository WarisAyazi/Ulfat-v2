<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Time;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

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

   
    

}

