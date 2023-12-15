<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocalGuardianController;
use App\Http\Controllers\PostcodeController;
use App\Models\Category;
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

//Blog APIs
Route::middleware(['auth:sanctum'])->get('blog',[BlogPostController::class, 'index'] );
Route::middleware(['auth:sanctum'])->get('blog/{id}',[BlogPostController::class, 'show'] );
Route::middleware(['auth:sanctum'])->get('blog/liked/{id}',[BlogPostController::class, 'liked'] );
Route::middleware(['auth:sanctum'])->get('blog/disliked/{id}',[BlogPostController::class, 'disliked'] );
Route::middleware(['auth:sanctum'])->post('blog',[BlogPostController::class, 'store'] );
Route::middleware(['auth:sanctum'])->patch('blog/{id}',[BlogPostController::class, 'update'] );


//comments APIs

Route::middleware(['auth:sanctum'])->post('comment',[CommentController::class, 'store'] );
Route::middleware(['auth:sanctum'])->patch('comment/{id}',[CommentController::class, 'update'] );

//Profile APIs
Route::middleware(['auth:sanctum'])->get('profile/{id}',[UserProfileController::class, 'show'] );

//categories APIs
Route::middleware(['auth:sanctum'])->get('category',[CategoryController::class, 'index'] );


//postcode APIs
Route::post('/postcode', [PostcodeController::class, 'index']);

//localGauaridan APIs
Route::get('localGuardian', [LocalGuardianController::class, 'show']);
Route::post('localGuardian', [LocalGuardianController::class, 'store']);


