<?php

test('test task item', function () {
    $response = $this->getJson('/api/task/1');

    $response->assertStatus(200)
        ->assertJsonPath('data.id', 1);
});
