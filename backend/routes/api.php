<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/auth')->group(function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
    Route::post('/logout', LogoutController::class)->middleware(['auth:sanctum']);
});

Route::middleware('auth:sanctum')->prefix('/tasks')->group(function () {
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/', [TaskController::class, 'index']);
    Route::get('/{id}', [TaskController::class, 'show']);
    Route::patch('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);
});

// Route::prefix('/tasks')->group(function () {
//     Route::post('/', [TaskController::class, 'store']);
//     Route::get('/', [TaskController::class, 'index']);
//     Route::get('/{id}', [TaskController::class, 'show']);
//     Route::patch('/{id}', [TaskController::class, 'update']);
//     Route::delete('/{id}', [TaskController::class, 'destroy']);
// });
