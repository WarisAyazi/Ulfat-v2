<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Teacher;

class TeacherFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Teacher::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'fname' => fake()->lastName(),
            'phone_number' => fake()->phoneNumber(),
            // 'date_of_birth' => fake()->numberBetween(-10000, 10000),
            // 'salary' => fake()->randomFloat(2, 0, 9999.99),
            'education' => fake()->regexify('[A-Za-z0-9]{50}'),
        ];
    }
}
