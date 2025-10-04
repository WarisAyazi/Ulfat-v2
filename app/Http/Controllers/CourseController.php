<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// use Illuminate\View\View;
use Inertia\Inertia;


class CourseController extends Controller
{
    public function index(Request $request)
    {
       $search = $request->input('search');
            $courses = Course::query()->when($search , function($query, $search){
                $query->where('title' ,'like', "%{$search}%")
                ->orWhere('id' , 'like',  "%{$search}%");},
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

        return redirect()->back();
    }

    public function show(Request $request, Course $course)
    {
        return response();
    }

    public function edit(Request $request, Course $course)
    {
        // return view('course.edit', [
        //     'course' => $course,
        // ]);
    }

    public function update(CourseUpdateRequest $request, Course $course): RedirectResponse
    {
        $course->update($request->validated());

        return redirect()->route('courses.index');
    }

    public function destroy(Request $request, Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()->route('courses.index');
    }
}
