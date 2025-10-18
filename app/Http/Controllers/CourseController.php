<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Illuminate\View\View;
use Inertia\Inertia;
use Morilog\Jalali\Jalalian;


class CourseController extends Controller
{
    public function index(Request $request)
    {
       $search = $request->input('search');
            $courses = Course::query()->when($search , function($query, $search){
                $query->where('title' ,'like', "%{$search}%")
                ->orWhere('id' , 'like',  "%{$search}%")
                ->orderBy('created_at', 'desc');},
                function ($query){
                    $query->latest()->limit(50);

                })->get();
            return Inertia::render('Features/subject/AllSubjects', [
            'courses' => $courses,
            'filters'=> $request->only('search')
            ]);
    }


    public function store(CourseStoreRequest $request): RedirectResponse
    {
        $course = Course::create($request->validated());

        return redirect()->route('courses.show', $course->id);
    }

    public function show($id)
    {
         $section = DB::table('courses')
            ->join('sections', 'courses.id', '=', 'sections.course_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('times', 'times.id', '=',  'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('courses.*',  'enrollments.year', 'students.name as sname' , 'teachers.name as tname', 'times.time' , 'sections.id as seid' )
            ->where('courses.id','=' ,$id)
             ->get() ;

        $course = Course::findOrFail($id);
        return Inertia::render('Features/subject/Subject', [
            'course' => $course,
            'section' => $section,
            // 'ctt' => $ctt,
        ]);
    
    }

    public function edit($id)
    {
        $course = Course::findOrFail($id);
        return Inertia::render('Features/subject/Edit', [
            'course' => $course,
        ]);
    }

    public function update(CourseStoreRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        return redirect()->route('courses.show', $course->id);
    }

    public function destroy(Request $request, Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()->route('courses.index');
    }
}
