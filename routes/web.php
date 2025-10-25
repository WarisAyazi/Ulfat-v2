<?php

use App\Http\Controllers\CourseTimeController;
use App\Http\Controllers\CreateStudentController;
use App\Http\Controllers\newController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StdShowController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
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
    // Route::get('/teachers', fn() => Inertia::render('Teachers'));
    // Route::get('create-student', fn()=> Inertia::render('Features/students/CreateStudentForm'));
    Route::get('create-teacher', fn()=> Inertia::render('Features/teachers/CreateTeacherTimeSubjectForm'));
});
 

require __DIR__.'/auth.php';

Route::resource('/new-student', CreateStudentController::class)
    ->only(['create', 'store', 'edit', 'update']);

Route::resource('/students', App\Http\Controllers\StudentController::class);
    // ->only(['show', 'index']);

Route::resource('/teachers', App\Http\Controllers\TeacherController::class);
Route::resource('/times', App\Http\Controllers\TimesController::class);
    // ->only(['show','store']);

Route::resource('/courses', App\Http\Controllers\CourseController::class);

Route::resource('/enrollment', App\Http\Controllers\EnrollmentController::class);


Route::get('/locale/{locale}', function($locale) {
    app()->setLocale($locale);
    Session()->put('locale', $locale);
    return redirect()->back();
});

Route::get('/student/show/{id}', [StdShowController::class, 'show']);

Route::get('/newEnrollment/{id}' , [newController::class,'newEnrollment'])->name('newEnrollment');
Route::get('/newCourse/{id}' , [newController::class,'newCourse'])->name('newCourse');
Route::post('/Course-Budget' , [newController::class,'CourseBudget'])->name('CourseBudget');
Route::post('/Time-Budget' , [newController::class,'TimeBudget'])->name('TimeBudget');
Route::post('/Teacher-Budget' , [newController::class,'TeacherBudget'])->name('TeacherBudget');