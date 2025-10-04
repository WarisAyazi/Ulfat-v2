<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TeacherStoreRequest;
use App\Http\Requests\TeacherUpdateRequest;
use App\Models\Time;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

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
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
