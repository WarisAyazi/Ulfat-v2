<?php

namespace App\Http\Controllers;

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
    public function index(Request $request): Response
    {
        $students = Student::all();

        return Inertia::render('Features/students/AllStudents', [
            'students' => $students,
        ]);
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
        $students = DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->select('students.*', 'sections.teacher_id')
            ->get();

        // error_log($students);
        $mainStu = Student::findOrFail($id);
        return Inertia::render('Features/students/Student', [
            'student' => $mainStu,
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
