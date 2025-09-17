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
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use PgSql\Lob;
use PhpParser\Node\Stmt\TryCatch;

use function Illuminate\Log\log;

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
         
        $studentVal =  $request->validate([
                'name'=> ['required', 'string'],
                'fname'  => ['required', 'string'],
                'gender'  => ['required', 'string'],
                'phone_number' => ['required', 'integer'],
            ]);
        $enrollmentVal = $request->validate([
            'amount' => ['required', 'integer'],
                'month' =>  ['required', 'string'],
            ]);
        $sectionVal = $request->validate([
                'time' => ['required', 'integer'],
                'subject' =>['required', 'integer'],
                'teacher' => ['required', 'integer'],
                
            ]);

        $student =  Student::create($studentVal);

        $enrollment = Enrollment::create($enrollmentVal);

        $section = ['student_id'=>  $student->id,
        "enrollment_id"=>$enrollment->id ,
        "time_id"=>$sectionVal['time']
        ,"course_id"=>$sectionVal['subject'],
        "teacher_id"=>$sectionVal['teacher']];

        Section::create($section);

        return redirect()->route('students.show', 1);
            
        // } catch (Exception $e) {
        //     error_log($e);
        // }
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
