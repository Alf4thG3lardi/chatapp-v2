<?php

namespace App\Http\Controllers;

use App\Models\Blockedfrom;
use Illuminate\Http\Request;

class BlockedfromController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('blockedfroms')
                ->join('chatusers', 'chatusers.id', '=', 'chatroomusers.user_id')
                ->join('chatrooms', 'chatrooms.id', '=', 'chatroomusers.chatroom_id')
                ->select('blockedfroms.*', 'chatusers.username', 'chatrooms.name')
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
        $data = BlockedFrom::create([
            'user_id' => $request->user_id,
            'chatroom_id' => $request->chatroom_id,
        ]);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blockedfrom $blockedfrom)
    {
        return response()->json([
            'data' => $blockedfrom
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blockedfrom $blockedfrom)
    {
        $blockedfrom->user_id = $request->user_id;
        $blockedfrom->chatroom_id = $request->chatroom_id;
        $blockedfrom->save();

        return response()->json([
            'data' => $blockedfrom
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blockedfrom $blockedfrom)
    {
        $blockedfrom->delete();
        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
