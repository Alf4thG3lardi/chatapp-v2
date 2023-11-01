<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatuserController;
use App\Http\Controllers\ChatroomController;
use App\Http\Controllers\ChatroomuserController;
use App\Http\Controllers\MessageController;

Route::post('login', [ChatuserController::class, 'login']);

Route::apiResource("chatuser", ChatuserController::class);
Route::apiResource("chatroom", ChatroomController::class);
Route::apiResource("chatroomuser", ChatroomuserController::class);
Route::apiResource("message", MessageController::class);