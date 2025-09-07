<?php

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
});


require __DIR__.'/auth.php';


Route::resource('students', App\Http\Controllers\StudentController::class);

Route::resource('teachers', App\Http\Controllers\TeacherController::class);

Route::resource('courses', App\Http\Controllers\CourseController::class);

Route::resource('enrollments', App\Http\Controllers\EnrollmentController::class);
