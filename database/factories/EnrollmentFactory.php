<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;

class EnrollmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Enrollment::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'amount' => fake()->numberBetween(-10000, 10000),
            'month' => fake()->regexify('[A-Za-z0-9]{30}'),
            'year' => fake()->randomFloat(0, 0, 9999.),
            'duration' => fake()->numberBetween(-10000, 10000),
            
        ];
    }
}
