<?php

namespace App\Http\Controllers;

use App\Http\Requests\EnrollmentStoreRequest;
use App\Http\Requests\EnrollmentUpdateRequest;
use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

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

    public function store(EnrollmentStoreRequest $request): RedirectResponse
    {
        $enrollment = Enrollment::create($request->validated());

        return redirect()->route('enrollments.index');
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
