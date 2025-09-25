<?php

namespace App\Http\Controllers;

use App\Http\Filters\StudentFilter;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StudentStoreRequest;
use App\Http\Requests\StudentUpdateRequest;

class StudentController extends Controller
{
    /**
     * index route of students controller
     * needs the type of $filters
     * any filter you apply it return data based o your filter
     * @param \App\Http\Filters\StudentFilter $filters
     * @return \Inertia\Response
     */
    public function index(StudentFilter $filters)
    {
        $students = Student::filter($filters)->paginate(50);

        return Inertia::render('Features/students/AllStudents', [
            'students' => $students,
        ]);
        /**
         * for testing the filter parameter in the api
         */
        // return response()->json($students);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('student.create');
    }

    public function store(StudentStoreRequest $request): RedirectResponse
    {
        $student = Student::create($request->validated());

        return redirect()->route('students.index');
    }

    public function show($id): Response
    {
        $section = DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('students.*',  'teachers.name as tname' , 'courses.title', 'times.time', 'enrollments.*', 'enrollments.created_at as date' )
            ->where('students.id','=' ,$id)->get();

        $ctt = DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->select('students.*',  'teachers.name as tname' , 'courses.title', 'times.time' , 'sections.id as seid','sections.*' )
            ->where('students.id','=' ,$id)->get();
            // ->groupBy('sections.student_id')->get();

        $mainStu = Student::findOrFail($id);
        return Inertia::render('Features/students/Student', [
            'student' => $mainStu,
            'section' => $section,
            'ctt' => $ctt,
        ]);
    }

    public function edit(Request $request, Student $student): Response
    {
        return Inertia::render('Features/students/Student', [
            'student' => 'hello student',
        ]);
    }

    public function update(StudentUpdateRequest $request, Student $student): RedirectResponse
    {
        $student->update($request->validated());

        return redirect()->route('students.index');
    }

    public function destroy(Request $request, Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('students.index');
    }
}
