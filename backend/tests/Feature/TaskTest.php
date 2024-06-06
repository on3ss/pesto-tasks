<?php

test('test create task', function () {
    $response = $this->postJson('/api/task', [
        'name' => 'First Task',
        'description' => 'Description for the first task'
    ]);
});
