<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $c = new Category();
        $c->name = "Movies";
        $c->save();
        $c1 = new Category();
        $c1->name = "Games";
        $c1->save();
        $c2 = new Category();
        $c2->name = "Sports";
        $c2->save();
        $c3 = new Category();
        $c3->name = "Technology";
        $c3->save();
        $c4 = new Category();
        $c4->name = "Education";
        $c4->save();
    }
}
