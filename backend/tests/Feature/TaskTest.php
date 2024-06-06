<?php

use App\Models\Task;
use App\Models\Status;
use Database\Seeders\StatusSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\{getJson, postJson, putJson, deleteJson};

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed([StatusSeeder::class]);
    $this->status = Status::inRandomOrder()->first();
});

it('can create a task', function () {
    $taskData = [
        'name' => 'Test Task',
        'description' => 'This is a test task description',
        'status_id' => $this->status->id,
    ];

    postJson('/api/task', $taskData)
        ->assertStatus(201)
        ->assertJson([
            'data' => [
                'name' => 'Test Task',
                'description' => 'This is a test task description',
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);

    $this->assertDatabaseHas('tasks', $taskData);
});

it('can fetch a task', function () {
    $task = Task::factory()->create(['status_id' => $this->status->id]);

    getJson('/api/task/' . $task->id)
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $task->id,
                'name' => $task->name,
                'description' => $task->description,
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);
});

it('can fetch all tasks', function () {
    Task::factory()->count(3)->create(['status_id' => $this->status->id]);

    getJson('/api/task')
        ->assertStatus(200)
        ->assertJsonCount(3, 'data');
});

it('can update a task', function () {
    $task = Task::factory()->create(['status_id' => $this->status->id]);

    $updateData = [
        'name' => 'Updated Task',
        'description' => 'Updated description',
        'status_id' => $this->status->id,
    ];

    putJson('/api/task/' . $task->id, $updateData)
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $task->id,
                'name' => 'Updated Task',
                'description' => 'Updated description',
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);

    $this->assertDatabaseHas('tasks', $updateData);
});

it('can delete a task', function () {
    $task = Task::factory()->create(['status_id' => $this->status->id]);

    deleteJson('/api/task/' . $task->id)
        ->assertStatus(204);

    $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
});

it('validates input when creating a task', function () {
    postJson('/api/task', [
        'description' => 'Hey'
    ])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'description', 'status_id']);
});

it('handles non-existent task fetching', function () {
    getJson('/api/task/999')
        ->assertStatus(404);
});

it('handles non-existent task updating', function () {
    putJson('/api/task/999', ['name' => 'Non-existent', 'status_id' => $this->status->id])
        ->assertStatus(404);
});

it('handles non-existent task deleting', function () {
    deleteJson('/api/task/999')
        ->assertStatus(404);
});

// Additional Tests

it('validates name field length', function () {
    postJson('/api/task', ['name' => str_repeat('a', 256), 'description' => 'Test', 'status_id' => $this->status->id])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});

it('validates description field length', function () {
    postJson('/api/task', ['name' => 'Test', 'description' => str_repeat('a', 1001), 'status_id' => $this->status->id])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['description']);
});

it('validates field types', function () {
    postJson('/api/task', ['name' => 123, 'description' => 456, 'status_id' => 'invalid'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['name', 'description', 'status_id']);
});

it('allows optional fields to be null', function () {
    $taskData = [
        'name' => 'Test Task',
        'description' => null,
        'status_id' => $this->status->id,
    ];

    postJson('/api/task', $taskData)
        ->assertStatus(201)
        ->assertJson([
            'data' => [
                'id' => 1,
                'name' => 'Test Task',
                'description' => null,
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);

    $this->assertDatabaseHas('tasks', $taskData);
});

it('returns correct JSON structure for error responses', function () {
    postJson('/api/task', [
        'description' => 'hey'
    ])
        ->assertStatus(422)
        ->assertJsonStructure([
            'message',
            'errors' => ['name', 'description', 'status_id']
        ]);
});

it('handles very large input data', function () {
    $taskData = [
        'name' => str_repeat('a', 255),
        'description' => str_repeat('a', 1000),
        'status_id' => $this->status->id,
    ];

    postJson('/api/task', $taskData)
        ->assertStatus(201)
        ->assertJson([
            'data' => [
                'name' => str_repeat('a', 255),
                'description' => str_repeat('a', 1000),
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);
});

it('handles special characters in input data', function () {
    $taskData = [
        'name' => 'Special $@!#%&*() characters',
        'description' => 'Description with special $@!#%&*() characters',
        'status_id' => $this->status->id,
    ];

    postJson('/api/task', $taskData)
        ->assertStatus(201)
        ->assertJson([
            'data' => [
                'name' => 'Special $@!#%&*() characters',
                'description' => 'Description with special $@!#%&*() characters',
                'status' => [
                    'id' => $this->status->id,
                    'name' => $this->status->name,
                    'theme_color' => $this->status->theme_color,
                ],
            ]
        ]);
});

it('filter name field', function () {
    Task::create([
        'name' => 'Task One',
        'description' => 'Description with special $@!#%&*() characters',
        'status_id' => $this->status->id,
    ]);
    Task::create([
        'name' => 'Task Three',
        'description' => 'Description with special $@!#%&*() characters',
        'status_id' => $this->status->id,
    ]);

    $toFilterTask = Task::create([
        'name' => 'Task Two',
        'description' => 'Description with special $@!#%&*() characters',
        'status_id' => $this->status->id,
    ]);

    $this
        ->getJson(route('task.index', ['filter[name]' => $toFilterTask->name]))
        ->assertStatus(200)
        ->assertJsonCount(1, 'data') // Ensure only one task is returned
        ->assertJsonFragment([
            'id' => $toFilterTask->id,
            'name' => 'Task Two',
            'description' => 'Description with special $@!#%&*() characters',
            'status' => [
                'id' => $this->status->id,
                'name' => $this->status->name,
                'theme_color' => $this->status->theme_color,
            ],
        ]);
});

it('filter status field', function () {
    Task::factory(20)->create();
    $tasksWithStatusCount = Task::where('status_id', $this->status->id)->count();

    $this
        ->getJson(route('task.index', ['filter[status_id]' => $this->status->id]))
        ->assertStatus(200)
        ->assertJsonCount($tasksWithStatusCount, 'data');
});
