<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    /**
     * Fields mass fillable
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'status_id', 'user_id'];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($task) {
            $task->user_id = auth()->user()->id;
        });
    }

    /**
     * Get the status associated with the Task.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function status(): HasOne
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}
