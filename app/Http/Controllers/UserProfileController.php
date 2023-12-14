<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Comment;
use App\Models\User;


use Illuminate\Http\Request;

class UserProfileController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
        $blogPage = $request->query('blogPage', 1);
        $commentPage = $request->query('commentPage', 1); 
        $user = User::with(['comment' => function ($query) use ($commentPage) {
            $query->orderBy('created_at', 'desc')->paginate(5);
        }, 'blogPost' => function ($query) use ($blogPage) {
            $query->orderBy('created_at', 'desc')->paginate(2, ['*'], 'page', $blogPage);
        }])->find($id);

        return response()->json($user);
    
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
