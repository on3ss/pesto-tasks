<?php
use App\Models\Task;
use Database\Seeders\TaskSeeder;
use Database\Seeders\StatusSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed([StatusSeeder::class, TaskSeeder::class]);
});

it('create task', function () {
    $response = $this->postJson('/api/task', [
        'name' => 'First Task',
        'description' => 'Description for the first task',
        'status_id' => 1
    ]);

    $response->assertStatus(201)
        ->assertJson([
            'data' => [
                'name' => 'First Task',
                'description' => 'Description for the first task',
                'status' => [
                    'id' => 1,
                    'name' => 'To-Do',
                    'theme_color' => 'warning'
                ]
            ]
        ]);
    $task = $response->json();

    $this->assertDatabaseHas('tasks', [
        'id' => $task['data']['id']
    ]);
});

it('fails to create task with invalid name', function () {
    $response = $this->postJson('/api/task', [
        'name' => 'Hey',
        'statud_id' => 1
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['name']);
});

it('fails to create task with invalid description', function () {
    $response = $this->postJson('/api/task', [
        'name' => 'First Task',
        'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed malesuada sapien. Aliquam vestibulum orci id augue aliquam molestie. Sed tortor elit, laoreet et tortor sit amet, aliquam convallis urna. Phasellus magna eros, sodales ac nisi non, tristique sollicitudin tortor. Aliquam nibh massa, fringilla at condimentum sit amet, semper in est. Maecenas sodales sem non erat mattis euismod. Integer ullamcorper vitae urna sed congue. Donec hendrerit efficitur nunc vitae semper. Curabitur porttitor, sapien sed consectetur posuere, est erat accumsan risus, vitae blandit arcu tellus non quam. Donec molestie enim ac nisi venenatis, sed pulvinar urna rutrum. In semper tempor orci, sit amet egestas magna sodales et. Nullam auctor mattis faucibus. Cras ac velit quis est dignissim rutrum eu eget nisi. Praesent imperdiet laoreet purus id imperdiet. Nam massa eros, ultricies aliquam fermentum et, lacinia eget massa. In hac habitasse platea dictumst. Proin non cursus sapien, ut iaculis lectus. Ut magna lacus, elementum ac justo eget, ultricies condimentum ex. Donec velit magna, vestibulum id sagittis ac, dignissim ac libero. Praesent pretium dolor ac sagittis interdum. Aliquam non orci gravida, molestie orci id, sagittis diam. Nunc enim massa, aliquet vitae ullamcorper eu, suscipit vel orci. Vivamus volutpat quam eget sapien pellentesque, nec ultrices lorem rutrum.',
        'statud_id' => 1
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['description']);
});

it('fails to create task with invalid status_id', function () {
    $response = $this->postJson('/api/task', [
        'name' => 'Hey',
        'description' => 'Description for the first task',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['status_id']);
});

it('get task with id', function () {
    $task = Task::create([
        'name' => 'First Task',
        'description' => 'Description for the first task',
        'status_id' => 1,
    ]);

    $response = $this->getJson("/api/task/{$task->id}");

    $response->assertStatus(200)
        ->assertJson([
            'data' => [
                'name' => 'First Task',
                'description' => 'Description for the first task',
                'status' => [
                    'id' => 1,
                    'name' => 'To-Do',
                    'theme_color' => 'warning'
                ]
            ]
        ]);
});

it('fails to get task with invalid id', function () {
    $task = Task::count() + 1;

    $response = $this->getJson("/api/task/{$task}");

    $response->assertStatus(404);
});
