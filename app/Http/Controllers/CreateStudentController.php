<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseTime;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CreateStudent;
use App\Models\Student;
use App\Models\Teacher;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

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
        try {
            Log::info('Message');
            log::info("Meaage");
            $request->validate([
                'name' => 'required', 'string',
                'fname' => 'required', 'string',
                'gender' => 'required', 'string',
                // 'subject' => 'required', 'integer',
                // 'month' => 'required', 'string',
                // 'time' => 'required', 'string',
                // 'teacher' => 'required', 'integer',
                // 'fee' => 'required', 'integer',
                // 'phone_number' => 'required', 'integer'
            ]);
            
            error_log($request->name);
            error_log($request->fname);
            error_log($request->gender);

            $student = new Student();
            $student->name = $request->name;
            $student->fname = $request->fname;
            $student->gender = $request->gender;
            $student->save();
            
            
            
            return redirect()->route('new-students/', ['id' => $student->id]);
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
