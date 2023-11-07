<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Message;
use Illuminate\Http\Request;


class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('messages')
        ->join('chatusers', 'chatusers.id', '=', 'messages.user_id')
        ->select('messages.*', 'chatusers.username')
        ->orderBy('created_at', 'asc')
        ->get();
        
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Message::create([
            'user_id' => $request->user_id,
            'chatroom_id' => $request->chatroom_id,
            'message' => base64_encode($request->message)
        ]);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return response()->json([
            'data' => $message
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        $message->user_id = $request->user_id;
        $message->chatroom_id = $request->chatroom_id;
        $message->message = base64_encode($request->message);
        $message->save();

        return response()->json([
            'data' => $message
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
