<?php

namespace App\Http\Controllers;

use App\Models\LocalGuardian;
use Illuminate\Http\Request;

class LocalGuardianController extends Controller
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
            'name' => 'required|max:255',
            'relationship' => 'required|max:255',
            'contact_number' => 'required|integer',
            'address' => 'required|max:255',

        ]);

        $localGuardian = new LocalGuardian;
        $localGuardian->name = $validatedData['name'];
        $localGuardian->relationship = $validatedData['relationship'];
        $localGuardian->contact_number = $validatedData['contact_number'];
        $localGuardian->address = $validatedData['address'];
        $localGuardian->student_id = $request->user()->id;

        $localGuardian->save();


        return response()->json(['status' => __(true)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $id = $request->user()->id ;
        $localGuardian = LocalGuardian::findOrFail($id);
       // $localGuardian = LocalGuardian::where('student_id', $id);

        return response()->json($localGuardian);

        
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
