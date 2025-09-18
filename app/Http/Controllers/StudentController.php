<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentStoreRequest;
use App\Http\Requests\StudentUpdateRequest;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

        // $request->session()->flash('student.id', $student->id);

        return redirect()->route('students.index');
    }

    public function destroy(Request $request, Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('students.index');
    }
}
