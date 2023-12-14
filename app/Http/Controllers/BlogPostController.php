<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Comment;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs =  BlogPost::with(['user' => function ($query) {
            $query->where('name', 'id');
         
        }])->get();
       // return BlogPost::with('user:id,name')->orderBy('created_at', 'desc')->paginate(10);
    //    $comments = Comment::with('user')->where('blog_post_id', $blogPostId)->get();


       return response()->json($blogs);

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
        //
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'author_id' => 'required|integer',
            'author_name' => 'required|max:255',
            'plain_text' => 'required'

        ]);

        $post = new BlogPost;
        $post->title = $validatedData['title'];
        $post->content = $validatedData['content'];
        $post->author_id = $validatedData['author_id'];
        $post->author_name = $validatedData['author_name'];
        $post->plain_text = $validatedData['plain_text'];

        $post->save();

        return response()->json(['status' => __(true)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       // $blog = BlogPost::findOrFail($id);
        $blog = BlogPost::with('comments')->find($id);

        if($blog) {
            $blog->increment('views',1, [
                'updated_at' => $blog->updated_at
             ]);
        }

        return response()->json($blog);
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
    public function update(Request $request, string $id){

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'plain_text' => 'required'

        ]);

        $blog = BlogPost::findOrFail($id);

        if ($request->user()->id !== $blog->author_id) {
            return response()->json(['error' => 'Unauthorized. You are not the creator of this blog post.'], 403);
        }

        $blog->title = $validatedData['title'];
        $blog->content = $validatedData['content'];
        $blog->plain_text = $validatedData['plain_text'];
        $blog->save();

        return response()->json(['status' => __(true)]);
       
    }

    public function liked(string $id)
    {
            $blog = BlogPost::findOrFail($id);
            if($blog) {
                $blog->increment('likes',1, [
                    'updated_at' => $blog->updated_at
                 ]);
            }
            return response()->json(['status' => __(true)]);
       
    }

    public function disliked( string $id)
    {
      
            $blog = BlogPost::findOrFail($id);
            if($blog) {
                $blog->decrement('likes',1, [
                    'updated_at' => $blog->updated_at
                 ]);
            }
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
