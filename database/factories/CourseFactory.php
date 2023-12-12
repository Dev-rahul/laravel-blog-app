<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     * 
     * 
     *
     * @return array<string, mixed>
     */

     private  $courseArray = array(             //created an array to set realistic courseData
        array("name" => "Computer Science, BSc (Hons)", "level" => "UG"),
        array("name" => "Computer Science and Artificial Intelligence, BSc (Hons)", "level" => "UG"),
        array("name" => "Applied Software Engineering, BSc", "level" => "UG"),
        array("name" => "Mathematics and Computer Science, BSc (Hons)", "level" => "UG"),

        array("name" => "Advanced Computer Science, MSc", "level" => "PG"),
        array("name" => "Advanced Software Technology, MSc", "level" => "PG"),
        array("name" => "Computer Science, MSc", "level" => "PG"),
        array("name" => "Cyber Security, MSc", "level" => "PG"),
        array("name" => "Data Science, MSc", "level" => "PG"));

    private $index = 0;

    public function definition(): array
    {

        $courseData = $this->courseArray[$this->index];

        $this->index++;

        return [
            'name' => $courseData['name'],
            'level' => $courseData['level'],
            'course_director' => fake()->name(), 
        ];

    }
}
