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

        $validated = $request->validate([
            'username' => ['required', 'unique:chatusers,username'],
            'name' => ['required'],
            'password' => ['required'],
            'email' => ['required', 'email', 'regex:/(.+)@(.+)\.(.+)/i', 'unique:chatusers,email'],
            'phone' => ['required', 'digits_between:0,9', 'numeric', 'min:8']
        ]);
        
        $data = Chatuser::create([
            'username' => $request->username,
            'name' => $request->name,
            'password' => base64_encode($request->password),
            'email' => $request->email,
            'phone' => $request->phone
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
        $validated = $request->validate([
            'username' => ['required', 'unique:chatusers,username', ],
            'name' => ['require'],
            'password' => ['required'],
            'email' => ['required', 'email', 'regex:/(.+)@(.+)\.(.+)/i', 'unique:chatusers,email'],
            'phone' => ['required', 'digits_between:0,9', 'numeric', 'min:8']
        ]);
        
        $chatuser->username = $request->username;
        $chatuser->name = $request->name;
        $chatuser->password = base64_encode($request->password);
        $chatuser->email = $request->email;
        $chatuser->phone = $request->phone;
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
