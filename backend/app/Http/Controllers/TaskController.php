<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Task;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with('status')->latest()->paginate(10);
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $taskRequest)
    {
        try {
            $status = Status::first()->id;
            $task = Task::create([
                ...$taskRequest->validated(),
                'status_id' => $status
            ]);
            return new TaskResource($task->load('status'));
        } catch (Exception $exception) {
            report($exception);
            return response(['error' => 'Something went wrong! Could not add task'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
