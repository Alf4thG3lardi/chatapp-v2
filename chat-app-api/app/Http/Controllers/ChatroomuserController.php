<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Chatroomuser;
use Illuminate\Http\Request;

class ChatroomuserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('chatroomusers')
                ->join('chatusers', 'chatusers.id', '=', 'chatroomusers.user_id')
                ->join('chatrooms', 'chatrooms.id', '=', 'chatroomusers.chatroom_id')
                ->select('chatroomusers.*', 'chatusers.username', 'chatrooms.name')
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
        $data = Chatroomuser::create([
            'user_id' => $request->user_id,
            'chatroom_id' => $request->chatroom_id,
            'banned' => $request->banned,
            'admin' => $request->admin
        ]);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatroomuser $chatroomuser)
    {
        return response()->json([
            'data' => $chatroomuser
        ]);
    }

    public function status($id_user, $id_room)
    {
        $data = DB::table('chatroomusers')
        ->where('user_id' , '=', $id_user)
        ->where('chatroom_id', '=', $id_room)
        ->first();

        if ($data) {
            return response()->json([
                'data' => $data
            ]);
        } else {
            return response()->json([
                'message' => 'not found'
            ]);
        }

    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatroomuser $chatroomuser)
    {
        $chatroomuser->user_id = $request->user_id;
        $chatroomuser->chatroom_id = $request->chatroom_id;
        $chatroomuser->banned = $request->banned;
        $chatroomuser->admin = $request->admin;
        $chatroomuser->save();

        return response()->json([
            'data' => $chatroomuser
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatroomuser $chatroomuser)
    {
        $chatroomuser->delete();
        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
