<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('create_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->references('id')->on('students');
            $table->foreignId('subject_id')->references('id')->on('courses');
            $table->string('month');
            $table->foreignId('time_id')->references('id')->on('course_times');
            $table->foreignId('teacher_id')->references('id')->on('teachers');
            $table->integer('fee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('create_students');
    }
};
