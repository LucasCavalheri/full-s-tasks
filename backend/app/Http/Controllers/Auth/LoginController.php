<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        $loginRequest = new LoginRequest();

        $validator = Validator::make($request->all(), $loginRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Auth::attempt($validator->validated())) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'token' => $token,
        ], 200);
    }
}
