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
            'language' => 'required', 'string',
            'subject' => 'required', 'integer',
            'month' => 'required', 'string',
            'time' => 'required', 'integer',
            'teacher' => 'required', 'integer',
            'amount' => 'required', 'integer',
            'phone_number' => 'required', 'integer',
        ],['fname'=>'The father name field is required.',
                    'phone_number'=>'The phone number field is required.']);
        
        try {
          

            $student = new Student();
            $student->name = $request->name;
            $student->fname = $request->fname;
            $student->language = $request->language;
            $student->phone_number = $request->phone_number;
            $student->save();

            $enrollment = new Enrollment();
            $enrollment->month = $request->month;
            $enrollment->amount = $request->amount;
            $enrollment->save();


            $section = new Section();
            $section->time_id = $request->time;
            $section->student_id = $student->id;
            $section->teacher_id = $request->teacher;
            $section->course_id = $request->subject;
            $section->enrollment_id = $enrollment->id;
            $section->save();
            
            // Get related data for printing
        $teacher = Teacher::find($request->teacher);
        $course = Course::find($request->subject);
        $time = Time::find($request->time);

        $printData = [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'fname' => $student->fname,
                'language' => $student->language,
                'phone_number' => $student->phone_number,
                'created_at' => $student->created_at,
            ],
            'enrollment' => [
                'month' => $enrollment->month,
                'amount' => $enrollment->amount,
            ],
            'section' => [
                'teacher_name' => $teacher->name ?? 'N/A',
                'course_name' => $course->title ?? 'N/A',
                'time_slot' => $time->time ?? 'N/A',
            ],
        ];

          $teachers = Teacher::all();
        $courses = Course::all();
        $times = Time::all();
          return Inertia::render('Features/students/CreateStudentForm', [
            'teachers' => $teachers,
            'courses' => $courses,
            'times' => $times,
            'flash' => [
                'success' => 'Student added successfully!',
                'print_data' => $printData
            ]
        ]);
        
                
    
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
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CreateStudent $createStudent)
    {
        $request->validate([
            'name' => 'required', 'string',
            'fname' => 'required', 'string',
            'language' => 'required', 'string',
            'subject' => 'required', 'integer',
            'month' => 'required', 'string',
            'time' => 'required', 'integer',
            'teacher' => 'required', 'integer',
            'amount' => 'required', 'integer',
            'phone_number' => 'required', 'integer',
        ],['fname'=>'The father name field is required.',
                    'phone_number'=>'The phone number field is required.']);
        
        try {
            $student = Student::findOrFail($createStudent);

            $student->name = $request->name;
            $student->fname = $request->fname;
            $student->language = $request->language;
            $student->phone_number = $request->phone_number;
            $student->save();

            $enrollment = new Enrollment();
            $enrollment->month = $request->month;
            $enrollment->amount = $request->amount;
            $enrollment->save();


            $section = new Section();
            $section->time_id = $request->time;
            $section->student_id = $student->id;
            $section->teacher_id = $request->teacher;
            $section->course_id = $request->subject;
            $section->enrollment_id = $enrollment->id;
            $section->save();
            
            
            return redirect()->route('students.show', ['student' => $student->id]);
        } catch (Exception $e) {
            error_log($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CreateStudent $createStudent)
    {
        //
    }
}
