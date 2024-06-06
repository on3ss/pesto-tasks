<?php

use App\Http\Controllers\StatusController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('task', TaskController::class);
// can change to apiResource if we want to perform CRUD operations later on
Route::get('status', [StatusController::class, 'index'])->name('status.index');
