<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/users', \App\Http\Controllers\Api\UserController::class)->middleware('role:Admin');
    Route::apiResource('/books', \App\Http\Controllers\BookController::class);
    Route::get('/roles', [\App\Http\Controllers\Api\UserController::class, 'roles']);
    Route::get('/collaborators', [\App\Http\Controllers\Api\UserController::class, 'getCollaborators']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
