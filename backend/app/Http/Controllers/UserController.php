<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware("auth:sanctum", except: ["index", "show"])
        ];
    }
   
    public function index()
    {
        return User::all();
    }
    
    public function show($id)
    {
        return User::find($id);
    }
    
    public function store(Request $req)
    {

        $currentTimestamp = Carbon::now();

        $validated = $req->validate([
            'email' => 'required|email|unique:users,email',
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'level' => 'required|in:1,2,3'
        ]);

        $user = new User;
        $user->email = $validated['email'];
        $user->name = $validated['name'];
        $user->password = Hash::make($validated['password']);
        $user->level = $validated['level'];
        $user->created_at = $currentTimestamp;
        $user->updated_at = $currentTimestamp;

        $user->save();

        $token = $user->createToken($req->email);
        
        return response()->json([
            "user" => $user, 
            "token" => $token->plainTextToken
        ], 201);
    }

    public function update(Request $req, $id)
    {

        $user = User::findOrFail($id);

        $currentTimestamp = Carbon::now();

        $validated = $req->validate([
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'name' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:8',
            'level' => 'sometimes|in:1,2,3'
        ]);

        $isUpdated = false;

        if ($req->filled('email') && $user->email !== $req->input('email')) {
            $user->email = $req->input('email');
            $isUpdated = true;
        }
    
        if ($req->filled('name') && $user->name !== $req->input('name')) {
            $user->name = $req->input('name');
            $isUpdated = true;
        }
    
        if ($req->filled('password') && !Hash::check($req->input('password'), $user->password)) {
            $user->password = Hash::make($req->input('password'));
            $isUpdated = true;
        }
    
        if ($req->filled('level') && $user->level !== $req->input('level')) {
            $user->level = $req->input('level');
            $isUpdated = true;
        }
    
        if ($isUpdated) {
            $user->updated_at = $currentTimestamp;
            $user->save();
        }
    
        return response()->json($user);;
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(null, 204);
    }
}
