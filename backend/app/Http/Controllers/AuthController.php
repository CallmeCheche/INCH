<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role_id'  => 'required|in:doctor,patient',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'role_id'  => $request->role_id,
            'profile_photo_path' => $request->profile_photo_path
        ]);

        return response()->json([
            'message' => 'User registered successfully.',
            'user'    => $user,
        ], 201);
    }

    /**
     * Log in user and create token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'token'   => $token,
            'user'    => $user,
        ]);
    }

    /**
     * Log out user (invalidate tokens)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Get current user profile
     */
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

/**
 * Update user profile photo
 */
public function updateProfilePhoto(Request $request)
{
    $request->validate([
        'profile_photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $user = $request->user();
    
    // Delete old photo if exists
    if ($user->profile_photo_path) {
        $oldPhotoPath = public_path('storage/' . $user->profile_photo_path);
        if (file_exists($oldPhotoPath)) {
            unlink($oldPhotoPath);
        }
    }
    
    // Store new photo
    $photoPath = $request->file('profile_photo')->store('profile-photos', 'public');
    
    // Update user record
    $user->profile_photo_path = $photoPath;
    $user->save();
    
    return response()->json([
        'message' => 'Profile photo updated successfully',
        'user' => $user
    ]);
}
}