<?php

use App\Http\Controllers\CreateStudentController;
use App\Http\Controllers\newController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StdShowController;
use App\Http\Controllers\DashboardController; // Add this line
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/api/dashboard/data', [DashboardController::class, 'getDashboardData'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.data');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'store'])->name('profile.store');
    Route::get('/profile-register', [ProfileController::class, 'register']);
    Route::get('/students', fn() => Inertia::render('Students'));
    Route::get('create-teacher', fn()=> Inertia::render('Features/teachers/CreateTeacherTimeSubjectForm'));
});

require __DIR__.'/auth.php';

Route::resource('/new-student', CreateStudentController::class)
    ->only(['create', 'store', 'edit', 'update']);

Route::resource('/students', App\Http\Controllers\StudentController::class);
Route::resource('/teachers', App\Http\Controllers\TeacherController::class);
Route::resource('/times', App\Http\Controllers\TimesController::class);
Route::resource('/courses', App\Http\Controllers\CourseController::class);
Route::resource('/enrollment', App\Http\Controllers\EnrollmentController::class);

Route::get('/newEnrollment/{id}' , [newController::class,'newEnrollment'])->name('newEnrollment');
Route::get('/newCourse/{id}' , [newController::class,'newCourse'])->name('newCourse');
Route::post('/Course-Budget' , [newController::class,'CourseBudget'])->name('CourseBudget');
Route::post('/Time-Budget' , [newController::class,'TimeBudget'])->name('TimeBudget');
Route::post('/Teacher-Budget' , [newController::class,'TeacherBudget'])->name('TeacherBudget');

Route::fallback(function(){
    return Inertia::render('NotFound');
});