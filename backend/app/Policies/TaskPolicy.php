<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any tasks.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        // Replace this with your logic, e.g., all authenticated users can view any tasks
        return true;
    }

    /**
     * Determine whether the user can view the task.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Task $task
     * @return mixed
     */
    public function view(User $user, Task $task)
    {
        // Replace this with your logic, e.g., only the owner can view the task
        return $user->id === $task->user_id;
    }

    /**
     * Determine whether the user can create tasks.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        // Replace this with your logic, e.g., all authenticated users can create tasks
        return true;
    }

    /**
     * Determine whether the user can update the task.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Task $task
     * @return mixed
     */
    public function update(User $user, Task $task)
    {
        // Replace this with your logic, e.g., only the owner can update the task
        return $user->id === $task->user_id;
    }

    /**
     * Determine whether the user can delete the task.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Task $task
     * @return mixed
     */
    public function delete(User $user, Task $task)
    {
        // Replace this with your logic, e.g., only the owner can delete the task
        return $user->id === $task->user_id;
    }
}
