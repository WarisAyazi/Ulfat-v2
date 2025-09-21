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

    public function edit(Request $request, Enrollment $enrollment): View
    {
        return view('enrollment.edit', [
            'enrollment' => $enrollment,
        ]);
    }

    public function update(EnrollmentUpdateRequest $request, Enrollment $enrollment): RedirectResponse
    {
        $enrollment->update($request->validated());

        return redirect()->route('enrollments.index');
    }

    public function destroy(Request $request, Enrollment $enrollment): RedirectResponse
    {
        $enrollment->delete();

        return redirect()->route('enrollments.index');
    }
}
