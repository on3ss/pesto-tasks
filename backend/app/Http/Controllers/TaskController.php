<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $tasks = Task::with('status')->latest()->paginate(10);
        return response()->json(TaskResource::collection($tasks));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TaskRequest $request
     * @return JsonResponse
     */
    public function store(TaskRequest $request): JsonResponse
    {
        try {
            $task = Task::create($request->validated());
            return response()->json(new TaskResource($task->load('status')), 201);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'Something went wrong! Could not add task'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function show(Task $task): JsonResponse
    {
        return response()->json(new TaskResource($task));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TaskRequest $request
     * @param Task $task
     * @return JsonResponse
     */
    public function update(TaskRequest $request, Task $task): JsonResponse
    {
        try {
            $task->update($request->validated());
            return response()->json(new TaskResource($task->load('status')));
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'Something went wrong! Could not update task'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function destroy(Task $task): JsonResponse
    {
        try {
            $task->delete();
            return response()->json(null, 204);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'Something went wrong! Could not delete task'], 500);
        }
    }
}
