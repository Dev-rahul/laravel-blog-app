<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;


class CourseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $c = new Course;
        $c->name = "Software Engineering, BSc (Hons)";
        $c->level = "UG";
        $c->course_director="Dr. Mike Wood";
        $c->save();

       Course::factory()->count(9)->create();
        
    }
}
