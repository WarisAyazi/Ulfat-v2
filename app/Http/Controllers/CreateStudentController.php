<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseTime;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CreateStudent;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;

class CreateStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $students = Student::all();
        $teachers = Teacher::all();
        $courses = Course::all();
        $times = CourseTime::all();
        return Inertia::render('Features/students/CreateStudentForm', [
            // 'students' => $students,
            'teachers' => $teachers,
            'courses' => $courses,
            'times' => $times
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'month' => 'required', 'string',
            'student_id' => 'required', 'integer',
            'subject_id' => 'required', 'integer',
            'month' => 'required', 'string',
            'time_id' => 'required', 'integer',
            'teacher_id' => 'required', 'integer',
            'fee' => 'required', 'integer',
        ]);
        
            
        $student = CreateStudent::create($request->validated());
        // $request->session()->flash('student.id', $student->id);
        return redirect()->route('students.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(CreateStudent $createStudent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CreateStudent $createStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CreateStudent $createStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CreateStudent $createStudent)
    {
        //
    }
}
