<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Attachment::all();
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'filename' => 'required|file|mimes:jpg,img,png,bmp,pdf,txt,docx,pptx',
        ]);

        $file = $request->file('filename');
        $path = $file->storeAs('public/storage', $file->getClientOriginalName());

        $attachment = Attachment::create([
            'filename' => $file->getClientOriginalName(),
            'filepath' => $path,
        ]);

        return response()->json([
            'data' => $attachment
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attachment $attachment)
    {
        return response()->json([
            'data' => $attachment
        ]);
    }

    public function download($id)
    {
        $file = DB::table('attachments')->where('id', $id)->first();
        return Storage::download($file->filepath);
        // return response()->json([
        //     'message' => 'data will be downloaded just a second'
        // ]);
        return response()->json([
            'data' => $file->filepath,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attachment $attachment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attachment $attachment)
    {
        $file = $attachment->filename;
        Storage::delete($file);
        $attachment->delete();
        return response()->json([
            'message' => 'data and file should be deleted'
        ]);
    }
}
