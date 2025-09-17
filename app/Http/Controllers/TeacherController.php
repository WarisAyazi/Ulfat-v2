<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherStoreRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Teacher;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(Request $request): Response
    {
        $teachers = Teacher::all();

        return Inertia::render('Teachers', [
            'teachers' => $teachers,
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('teacher.create');
    }

    public function store(TeacherStoreRequest $request): RedirectResponse
    {

        

        $teacher = Teacher::create($request->validated());

        $request->session()->flash('teacher.id', $teacher->id);

        return redirect()->route('teachers.index');
    }

    public function show(Request $request, Teacher $teacher): Response
    {
        return Inertia::render('teacher.show', [
            'teacher' => $teacher,
        ]);
    }

    public function edit(Request $request, Teacher $teacher): Response
    {
        return Inertia::render('teacher.edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(TeacherUpdateRequest $request, Teacher $teacher): RedirectResponse
    {
        $teacher->update($request->validated());

        $request->session()->flash('teacher.id', $teacher->id);

        return redirect()->route('teachers.index');
    }

    public function destroy(Request $request, Teacher $teacher): RedirectResponse
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}
