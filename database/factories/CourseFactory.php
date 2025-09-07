<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Course;
use App\Models\Teacher;

class CourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Course::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'language' => fake()->regexify('[A-Za-z0-9]{40}'),
            'year' => fake()->randomFloat(0, 0, 9999.),
            'start_date' => fake()->regexify('[A-Za-z0-9]{30}'),
            'end_date' => fake()->regexify('[A-Za-z0-9]{30}'),
            'room_number' => fake()->numberBetween(-10000, 10000),
            'teacher_id' => Teacher::factory(),
        ];
    }
}
