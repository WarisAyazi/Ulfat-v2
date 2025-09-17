<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Section;
use App\Models\Time;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CreateStudent;
use App\Models\Student;
use App\Models\Teacher;
use Exception;


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
        $teachers = Teacher::all();
        $courses = Course::all();
        $times = Time::all();
        return Inertia::render('Features/students/CreateStudentForm', [
            'teachers' => $teachers,
            'courses' => $courses,
            'times' => $times
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required', 'string',
            'fname' => 'required', 'string',
            'gender' => 'required', 'string',
            'subject' => 'required', 'integer',
            'month' => 'required', 'string',
            'time' => 'required', 'integer',
            'teacher' => 'required', 'integer',
            'amount' => 'required', 'integer',
            'phone_number' => 'required', 'integer',
        ]);
        
        try {

            $student = new Student();
            $student->name = $request->name;
            $student->fname = $request->fname;
            $student->gender = $request->gender;
            $student->phone_number = $request->phone_number;
            $student->save();

            $enrollment = new Enrollment();
            $enrollment->month = $request->month;
            $enrollment->amount = $request->amount;
            $enrollment->save();


            $section = new Section();
            $section->time_id = $request->time;
            $section->student_id =$student->id;
            $section->teacher_id =$request->teacher;
            $section->course_id =$request->subject;
            $section->enrollment_id =$enrollment->id;
            $section->save();
            
            
            
            return redirect()->route('students.show', ['student' => $student]);
        } catch (Exception $e) {
            error_log($e);
        }
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
