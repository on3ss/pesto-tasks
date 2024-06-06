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
    protected $fillable = ['name', 'description', 'status_id'];

    public static function boot(): void
    {
        static::creating(fn(Model $model) => $model->status_id = Status::first()->id);
    }

    /* Get the user associated with the Task
     *
     * @return Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function status(): HasOne
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}
