<?php

namespace App\Http\Controllers;

use App\Models\Chatuser;
use Illuminate\Http\Request;

class ChatuserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Chatuser::all();
        return response()->json([
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = Chatuser::create([
            'username' => $request->username,
            'password' => base64_encode($request->password),
            'isAdmin' => 0,
            'isBanned' => 0
        ]);

        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatuser $chatuser)
    {
        return response()->json([
            'data' => $chatuser
        ]);
    }

    /**
     *  select and validate login
     */
    public function login(Request $request)
    {
        $name = $request->name;
        $password = $request->password;
        $encoded = base64_encode($password);

        $user = Chatuser::where("username",'=', $name)->first();

        // return response()->json([
        //     'data' => $user,
        //     'input' => $name,
        //     'password' => $password
        // ]);
        if ($encoded == $user->password) {
            return response()->json([
                'message' => 'login success',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'login failed'
            ]);
        }
        
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatuser $chatuser)
    {
        $chatuser->username = $request->username;
        $chatuser->password = $request->password;
        $chatuser->isAdmin = $request->isAdmin;
        $chatuser->isBanned = $request->isBanned;

        $chatuser->save();

        return response()->json([
            'data' => $chatuser
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatuser $chatuser)
    {
        $chatuser->delete();
        return response()->json([
            'message' => 'data deleted'
        ]);
    }
}
