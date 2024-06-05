<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $tasks = QueryBuilder::for(Task::class)
            ->with('status')
            ->allowedFilters(['name', 'status_id'])
            ->allowedSorts(['name'])
            ->latest()
            ->paginate();
        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TaskRequest $request
     * @return TaskResource
     */
    public function store(TaskRequest $request): TaskResource
    {
        try {
            $task = Task::create($request->validated());
            return new TaskResource($task->load('status'));
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'Something went wrong! Could not add task'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Task $task
     * @return TaskResource
     */
    public function show(Task $task): TaskResource
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TaskRequest $request
     * @param Task $task
     * @return TaskResource
     */
    public function update(TaskRequest $request, Task $task): TaskResource
    {
        try {
            $task->update($request->validated());
            return new TaskResource($task->load('status'));
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
