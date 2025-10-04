<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherStoreRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Teacher;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class TeacherController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
            $teachers = Teacher::query()->when($search , function($query, $search){
                $query->where('name' ,'like', "%{$search}%")
                ->orWhere('id' , 'like',  "%{$search}%");},
                function ($query){
                    $query->latest()->limit(100);

                })->get();
            return Inertia::render('Features/teachers/AllTeachers', [
            'teachers' => $teachers,
            'filters'=> $request->only('search')
            ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('teacher.create');
    }

    public function store(TeacherStoreRequest $request): RedirectResponse
    {

        $teacher = Teacher::create($request->validated());

        return redirect()->route('teachers.show', $teacher->id);
    }

    public function show($id): Response
    {
        $section = DB::table('teachers')
            ->join('sections', 'teachers.id', '=', 'sections.teacher_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=',  'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('teachers.*',  'students.name as sname' , 'courses.title', 'times.time', 'enrollments.*', 'enrollments.created_at as date' )
            ->where('teachers.id','=' ,$id)->get();

        $ctt = DB::table('teachers')
            ->join('sections', 'teachers.id', '=', 'sections.teacher_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->select('teachers.*',  'students.name as sname' , 'courses.title', 'times.time' , 'sections.id as seid','sections.*' )
            ->where('teachers.id','=' ,$id)->get();

        $teacher = Teacher::findOrFail($id);
        return Inertia::render('Features/teachers/Teacher', [
            'teacher' => $teacher,
            'section' => $section,
            'ctt' => $ctt,
        ]);
    }

    public function edit($id): Response
    {
        $teacher = Teacher::findOrFail($id);
        return Inertia::render('Features/teachers/CreateTeacher', [
            'teacher' => $teacher,
        ]);
    }

    public function update(TeacherUpdateRequest $request, Teacher $teacher): RedirectResponse
    {
        $teacher->update($request->validated());

        return redirect()->route('teachers.index');
    }

    public function destroy(Request $request, Teacher $teacher): RedirectResponse
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}
