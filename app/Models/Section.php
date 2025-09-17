<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
   protected $fillable =[
        'student_id',
        'time_id',
        'teacher_id',
        'course_id',
        'enrollment_id'
    ];
}
