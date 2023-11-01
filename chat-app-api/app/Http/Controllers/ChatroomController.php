<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use Illuminate\Http\Request;

class ChatroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Chatroom::all();
        return response()->json([
            'data' => $data
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Chatroom::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatroom $chatroom)
    {
        return response()->json([
            'data' => $chatroom
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatroom $chatroom)
    {
        $chatroom->name = $request->name;
        $chatroom->save();

        return response()->json([
            'data' => $chatroom
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatroom $chatroom)
    {
        $chatroom->delete();
        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
