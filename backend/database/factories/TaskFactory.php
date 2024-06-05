<?php

namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words($this->faker->numberBetween(1, 5), true),
            'description' => $this->faker->sentences(1, true),
            'status_id' => $this->faker->numberBetween(1, Status::count())
        ];
    }
}
