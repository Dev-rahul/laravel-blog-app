<?php

use App\Http\Controllers\BlogPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Course;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/courses', function () {
    return Course::all();
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->get('blog',[BlogPostController::class, 'index'] );
Route::middleware(['auth:sanctum'])->get('blog/{id}',[BlogPostController::class, 'show'] );
Route::middleware(['auth:sanctum'])->get('blog/liked/{id}',[BlogPostController::class, 'liked'] );
Route::middleware(['auth:sanctum'])->get('blog/disliked/{id}',[BlogPostController::class, 'disliked'] );
Route::middleware(['auth:sanctum'])->post('blog/create',[BlogPostController::class, 'store'] );


