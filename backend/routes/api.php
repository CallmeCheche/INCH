<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Routes publiques
Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{id}', [DoctorController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    // Existing routes...
    Route::post('/profile/photo', [AuthController::class, 'updateProfilePhoto']);
});

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    
    // Routes pour les rendez-vous
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    
    // Routes pour les médecins (protégées)
    Route::get('/doctors/dashboard/stats', [DoctorController::class, 'dashboardStats']);
    Route::get('/doctors/appointments', [DoctorController::class, 'appointments']);
    Route::get('/doctors/patients', [DoctorController::class, 'patients']);
    
    // Routes pour les patients
    Route::get('/patients/dashboard/stats', [PatientController::class, 'dashboardStats']);
    Route::get('/patients/appointments', [PatientController::class, 'appointments']);
    Route::get('/patients/profile', [PatientController::class, 'profile']);
    Route::put('/patients/profile', [PatientController::class, 'updateProfile']);
});