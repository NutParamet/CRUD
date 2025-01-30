<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => $this->faker->unique()->numberBetween(100000, 999999),  // สร้างรหัสนักเรียนที่ไม่ซ้ำกัน
            'name' => $this->faker->name(),  // ชื่อนักเรียน
            'age' => $this->faker->numberBetween(18, 25),  // อายุระหว่าง 18 ถึง 25 ปี
            'major' => $this->faker->word(),  // สาขาวิชา เช่น "Computer Science"
        ];
    }
}
