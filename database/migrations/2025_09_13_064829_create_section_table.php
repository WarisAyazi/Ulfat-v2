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
        Schema::create('section', function (Blueprint $table) {
            $table->id();
                        $table->foreignId('time_id')->references('id')->on('times');
                        $table->foreignId('student_id')->references('id')->on('students');
                        $table->foreignId('teacher_id')->references('id')->on('teachers');
                        $table->foreignId('course_id')->references('id')->on('courses');
                        $table->foreignId('enrollment_id')->references('id')->on('enrollments');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
