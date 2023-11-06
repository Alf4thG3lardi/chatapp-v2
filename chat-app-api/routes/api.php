<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatuserController;
use App\Http\Controllers\ChatroomController;
use App\Http\Controllers\ChatroomuserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\BlockedfromController;

Route::post('login', [ChatuserController::class, 'login']);

Route::apiResource("chatuser", ChatuserController::class);
Route::apiResource("chatroom", ChatroomController::class);
Route::apiResource("chatroomuser", ChatroomuserController::class);
Route::apiResource("message", MessageController::class);
Route::get('download/{id}', [AttachmentController::class, 'download'])->name('download');
Route::apiResource('attachment', AttachmentController::class);
Route::apiResource('block', BlockedfromController::class);
