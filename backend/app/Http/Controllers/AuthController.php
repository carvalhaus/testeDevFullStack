<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $req)
    {
        $validated = $req->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
    
        $user = User::where('email', $validated['email'])->first();
    
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['error' => 'Email ou senha inválidos!'], 401);
        }

        $token = $user->createToken($user->email);

        return response()->json([
            "user" => $user, 
            "token" => $token->plainTextToken
        ]);
    }

    public function logout(Request $req)
    {
        if ($req->user()) {
            $req->user()->tokens()->delete();
            return response()->json([
                "message" => "You are logged out!"
            ]);
        }
    
        return response()->json([
            "message" => "Not authenticated!"
        ], 401);
    }
}
