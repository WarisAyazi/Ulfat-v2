<?php

namespace App\Http\Controllers;

use App\Models\CourseTime;
use App\Models\Time;
use Illuminate\Http\Request;

class CourseTimeController extends Controller
{


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
        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
