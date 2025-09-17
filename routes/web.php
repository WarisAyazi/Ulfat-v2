<?php

use App\Http\Controllers\CourseTimeController;
use App\Http\Controllers\CreateStudentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Main');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/students', fn() => Inertia::render('Students'));
    Route::get('/teachers', fn() => Inertia::render('Teachers'));
    // Route::get('create-student', fn()=> Inertia::render('Features/students/CreateStudentForm'));
    Route::get('create-teacher', fn()=> Inertia::render('Features/teachers/CreateTeacherTimeSubjectForm'));
});
 

require __DIR__.'/auth.php';

Route::resource('/new-student', CreateStudentController::class)
    ->only(['create', 'store']);

Route::resource('/students', App\Http\Controllers\StudentController::class)
    ->only(['show']);

Route::resource('/teachers', App\Http\Controllers\TeacherController::class)
    ->only(['store']);

Route::resource('/courses', App\Http\Controllers\CourseController::class)
    ->only(['store']);

Route::post('/time', [CourseTimeController::class,'store']);
