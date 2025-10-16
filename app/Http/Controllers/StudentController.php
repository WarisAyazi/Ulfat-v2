<?php

namespace App\Http\Controllers;

use App\Http\Filters\StudentFilter;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StudentStoreRequest;
use App\Http\Requests\StudentUpdateRequest;
use Carbon\Carbon;
use Morilog\Jalali\Jalalian;

class StudentController extends Controller
{
    /**
     * index route of students controller
     * needs the type of $filters
     * any filter you apply it return data based o your filter
     * @param \App\Http\Filters\StudentFilter $filters
     * @return \Inertia\Response
     */
    // public function index(StudentFilter $filters)
    public function index(Request $request)
    {
            $search = $request->input('search');
            $students = Student::query()->when($search , function($query, $search){
                $query->where('name' ,'like', "%{$search}%")
                ->orWhere('id' , 'like',  "%{$search}%");},
                function ($query){
                    $query->latest()->limit(100);

                })->get();
            return Inertia::render('Features/students/AllStudents', [
            'students' => $students,
            'filters'=> $request->only('search')
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
       $section = DB::table('students')
    ->join('sections', 'students.id', '=', 'sections.student_id')
    ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
    ->join('courses', 'courses.id', '=', 'sections.course_id')
    ->join('times', 'times.id', '=', 'sections.time_id')
    ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
    ->select(
        'students.*',
        'students.id as stuid',
        'teachers.name as tname',
        'courses.title',
        'times.time',
        'enrollments.*',
        'enrollments.created_at as date',
        'sections.id as secid'
    )
    ->where('students.id', '=', $id)
    ->orderBy('enrollments.created_at', 'desc')
    ->get() ->map(function ($item) {
        if (isset($item->date)) {
            $item->date = Jalalian::fromCarbon(Carbon::parse($item->created_at))->format('Y-m-d h:i');
        }
        
        return $item;
    });;

        $ctt = DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->select('students.*',  'teachers.name as tname' , 'courses.title', 'times.time' , 'sections.id as seid','sections.*' )
            ->where('students.id','=' ,$id)
            
            ->get();

        $mainStu = Student::findOrFail($id);
        return Inertia::render('Features/students/Student', [
            'student' => $mainStu,
            'section' => $section,
            'ctt' => $ctt,
        ]);
    } 

    public function edit($id)
    {
        
        
        $student = Student::findOrFail($id);
        return Inertia::render('Features/students/Edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $request->validate([
            'name' => 'required', 'string',
            'fname' => 'required', 'string',
            'language' => 'required', 'string',
            'phone_number' => 'required', 'integer',
        ]);
        $student->update($request->all());

        return redirect()->route('students.show' , $request->id);
    }

    public function destroy(Request $request, Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('students.index');
    }
}
