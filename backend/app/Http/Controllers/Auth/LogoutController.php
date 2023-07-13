<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        auth('sanctum')->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
    }
}
