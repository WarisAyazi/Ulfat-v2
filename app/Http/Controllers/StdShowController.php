<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\RedirectResponse;

class StdShowController extends Controller
{
    public function show($id)
    {
        $student = Student::findOrFail($id);
        return view('student', ['student' => $student]);
    }
}