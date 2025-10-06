<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TeacherStoreRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Time;
use Carbon\Carbon;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Morilog\Jalali\Jalalian;

class TimesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
            $times = Time::query()->when($search , function($query, $search){
                $query->where('time' ,'like', "%{$search}%");},
                function ($query){
                    $query->latest()->limit(50);

                })->get();
            return Inertia::render('Features/times/AllTimes', [
            'times' => $times,
            'filters'=> $request->only('search')
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate(
            ['time' => 'required', 'string']
        );

        $time = new Time();
        $time->time = $request->time;
        $time->save();
        return redirect()->route('times.show', $time->id);
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
         $section = DB::table('times')
            ->join('sections', 'times.id', '=', 'sections.time_id')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=',  'sections.course_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('times.*',  'enrollments.year', 'students.name as sname' , 'teachers.name as tname', 'courses.title' , 'sections.id as seid' )
            ->where('times.id','=' ,$id)
            ->get();

        
        $time = Time::findOrFail($id);
        return Inertia::render('Features/times/Time', [
            'time' => $time,
            'section' => $section,
            
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
         $time = Time::findOrFail($id);
        return Inertia::render('Features/times/Edit', [
            'time' => $time,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
         $request->validate(
            ['ttime' => 'required', 'string']
        );

         Time::where('id', $id)->update(['time'=>$request->ttime]);

        return redirect()->route('times.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
