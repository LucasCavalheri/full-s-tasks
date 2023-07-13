<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $registerRequest = new RegisterRequest();

        $validator = Validator::make($request->all(), $registerRequest->rules());

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create($validator->validated());

        if (!$user) {
            return response()->json([
                'message' => 'User not created.',
            ], 500);
        }

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
        ], 201);
    }
}
