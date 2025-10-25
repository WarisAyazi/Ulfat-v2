<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeacherStoreRequest;
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
                ->orWhere('id' , 'like',  "%{$search}%")
                ->orderBy('created_at', 'desc');},
                function ($query){
                    $query->latest()->limit(50);

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
            ->select('teachers.*',  'enrollments.year', 'students.name as sname' , 'courses.title', 'times.time' , 'sections.id as seid' )
            ->where('teachers.id','=' ,$id)
             ->get() ;

        
        $teacher = Teacher::findOrFail($id);
        return Inertia::render('Features/teachers/Teacher', [
            'teacher' => $teacher,
            'section' => $section,
            
        ]);
    
    }

    public function edit($id): Response
    {
        $teacher = Teacher::findOrFail($id);
        return Inertia::render('Features/teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(TeacherStoreRequest $request, Teacher $teacher): RedirectResponse
    {
        
        $teacher->update($request->all());

        return redirect()->route('teachers.show' , $request->id);
    }

    public function destroy(Request $request, Teacher $teacher): RedirectResponse
    {
        $teacher->delete();

        return redirect()->route('teachers.index');
    }
}
