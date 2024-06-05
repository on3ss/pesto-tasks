<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::create([
            'name' => 'To-Do',
            'theme_color' => 'warning'
        ]);
        Status::create([
            'name' => 'In Progress',
            'theme_color' => 'info'
        ]);
        Status::create([
            'name' => 'Done',
            'theme_color' => 'success'
        ]);
    }
}
