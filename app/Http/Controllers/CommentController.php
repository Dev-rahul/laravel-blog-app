<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|max:1000',
            'blog_post_id' => 'required|integer',

        ]);

        $comment = new Comment;
        $comment->content = $validatedData['content'];
        $comment->author_id = $request->user()->id;
        $comment->blog_post_id = $validatedData['blog_post_id'];
        $comment->author_name = $request->user()->name;

        $comment->save();

        return response()->json(['status' => __(true)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'content' => 'required',

        ]);

        $comment = Comment::findOrFail($id);

        if ($request->user()->id !== $comment->author_id) {
            return response()->json(['error' => 'Unauthorized. You are not the creator of this blog post.'], 403);
        }

        $comment->content = $validatedData['content'];
        $comment->save();

        return response()->json(['status' => __(true)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
