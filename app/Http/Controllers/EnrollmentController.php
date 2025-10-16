<?php

namespace App\Http\Controllers;

use App\Http\Requests\EnrollmentStoreRequest;
use App\Http\Requests\EnrollmentUpdateRequest;
use App\Models\Enrollment;
use App\Models\Section;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;



use Inertia\Inertia;
use Inertia\Response;
use App\Models\Student;
use Exception;
use Illuminate\Support\Facades\DB;


class EnrollmentController extends Controller
{
    public function index(Request $request): View
    {
        $enrollments = Enrollment::all();

        return view('enrollment.index', [
            'enrollments' => $enrollments,
        ]);
    }

    public function create(Request $request): View
    {
        return view('enrollment.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required', 'string',
            'subject' => 'required', 'integer',
            'month' => 'required', 'string',
            'time' => 'required', 'integer',
            'teacher' => 'required', 'integer',
            'amount' => 'required', 'integer',
        ]);
        try {
            $enrollment = new Enrollment();
            $enrollment->month = $request->month;
            $enrollment->amount = $request->amount;
            $enrollment->save();


            $section = new Section();
            $section->time_id = $request->time;
            $section->student_id = $request->id;
            $section->teacher_id = $request->teacher;
            $section->course_id = $request->subject;
            $section->enrollment_id = $enrollment->id;
            $section->save();
            
            
            
            return redirect()->route('students.show', ['student' => $request->id]);
        } catch (Exception $e) {
            error_log($e);
        }
    }

    public function show(Request $request, Enrollment $enrollment): View
    {
        return view('enrollment.show', [
            'enrollment' => $enrollment,
        ]);
    }

    public function edit($id)
    {
         $ctt = DB::table('sections')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('students.*',  'teachers.id as tid' ,'enrollments.id as enrid', 'enrollments.amount','courses.id as couid', 'times.id as tiid' , 'sections.id as secid' )
            ->where('sections.id','=' ,$id)
            ->get();

         $stuid = DB::table('sections')
            ->join('students', 'students.id', '=', 'sections.student_id')
            ->select('students.id' )
            ->where('sections.id','=' ,$id)
            ->get();
         $enrid = DB::table('sections')
            ->join('enrollments', 'enrollments.id', '=', 'sections.enrollment_id')
            ->select('enrollments.id' )
            ->where('sections.id','=' ,$id)
            ->get();

        $sctt = DB::table('students')
            ->join('sections', 'students.id', '=', 'sections.student_id')
            ->join('teachers', 'teachers.id', '=', 'sections.teacher_id')
            ->join('courses', 'courses.id', '=', 'sections.course_id')
            ->join('times', 'times.id', '=', 'sections.time_id')
            ->select('students.*',  'teachers.name as tname' ,'teachers.id as tid' ,'courses.title', 'courses.id as couid' ,'times.time' , 'times.id as tiid' , 'sections.id as secid' )
            ->where('students.id','=' ,$stuid[0]->id)
            ->get();

       

        return Inertia::render('Features/students/EditEnrollment', [
            // 'student' => $student,
            // 'teachers'=>$teachers,
            // 'times'=>$times,
            // 'courses'=>$courses,
            "enrid"=>$enrid[0]->id,
            'id'=>$id,
            'ctt'=>$ctt,
            'sctt'=>$sctt
            
        ]);
    }

    public function update(Request $request,$id)
    {
         $request->validate([
            'subject' => 'required', 'integer',
            'month' => 'required', 'string',
            'time' => 'required', 'integer',
            'teacher' => 'required', 'integer',
            'amount' => 'required', 'integer',
        ]);

       Enrollment::where('id', $request->enrid)->update(['month' =>$request->month, 'amount'=>$request->amount]);
       section::where('id', $id)->update(['time_id' =>$request->time, 'teacher_id'=>$request->teacher,'course_id'=>$request->subject]);
        
        return redirect()->route('students.show', ['student' => $request->id]);

    }

    public function destroy(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index');
    }
}
