<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthenticationController extends Controller
{
    //this method adds new users
    public function signUp(Request $request){
      $fields = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|unique:users,email',
        'password' => 'required|string|confirmed'
      ]);

      $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => \Hash::make($fields['password']),
      ]);

      $token = $user->createToken('myapptoken')->plainTextToken;

      $response = [
        'user' => $user,
        'token' => $token
      ];

      return response($response, 201);
    }
    //use this method to signin users
    public function signIn(Request $request){
      $fields = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string'
      ]);

      //Check email
      $user = User::where('email',$fields['email'])->first();
      if (!$user || !\Hash::check($fields['password'], $user->password)) {
        return response([
        'message' => 'Invalid email or password'
        ],401);
      }

      $token = $user->createToken('myapptoken')->plainTextToken;


      $users['id']    = $user['id'];
      $users['name']  = $user['name'];
      $users['email'] = $user['email'];
      $users['user_type'] = $user['user_type'];
      $response = [
        'user' => $users,
        'token' => $token
      ];

      return response($response, 201);
    }

    // this method signs out users by removing tokens
    public function signOut(){
      auth()->user()->tokens()->delete();
      return [
        'message' => 'Logged Out'
      ];
    }
}
