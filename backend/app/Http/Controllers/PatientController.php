<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Appointment;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::with('user')->get()->map(function ($patient) {
            return [
                'id' => $patient->id,
                'name' => $patient->user->name,
                'email' => $patient->user->email,
                'image' => $patient->user->profile_photo_path,
                'gender' => $patient->gender,
                'age' => $patient->age,
                'phone' => $patient->phone,
            ];
        });

        return response()->json($patients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $patient = Patient::create($request->validated());
       // Get the authenticated user
    $user = Auth::user();
    
    // Create patient with validated data and include the role_id from user
    $validatedData = $request->validated();
    $validatedData['role_id'] = $user->role_id;
    
    $patient = Patient::create($validatedData);
    
    return response()->json($patient, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        $patient->load('user');
        
        return response()->json([
            'id' => $patient->id,
            'name' => $patient->user->name,
            'email' => $patient->user->email,
            'image' => $patient->user->profile_photo_path,
            'gender' => $patient->gender,
            'age' => $patient->age,
            'phone' => $patient->phone,
            'address' => $patient->address,
            'medicalHistory' => $patient->medical_history,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());
        return response()->json($patient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get dashboard statistics for the patient.
     */
    public function dashboardStats()
    {
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->firstOrFail();
        
        $upcomingAppointments = Appointment::where('patient_id', $patient->id)
            ->where('date', '>=', now()->format('Y-m-d'))
            ->count();
            
        $pastAppointments = Appointment::where('patient_id', $patient->id)
            ->where('date', '<', now()->format('Y-m-d'))
            ->count();
            
        $reviewsGiven = Appointment::where('patient_id', $patient->id)
            ->whereNotNull('review')
            ->count();
            
        $profileCompletion = $this->calculateProfileCompletion($patient);
            
        return response()->json([
            'upcomingAppointments' => $upcomingAppointments,
            'pastAppointments' => $pastAppointments,
            'reviewsGiven' => $reviewsGiven,
            'profileCompletion' => $profileCompletion,
        ]);
    }
    
    /**
     * Get appointments for the patient.
     */
    public function appointments()
    {
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->firstOrFail();
        
        $appointments = Appointment::with('doctor.user')
            ->where('patient_id', $patient->id)
            ->orderBy('date')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'doctorName' => $appointment->doctor->user->name,
                    'specialty' => $appointment->doctor->specialty,
                    'date' => $appointment->date,
                    'time' => $appointment->time,
                    'type' => $appointment->type,
                    'status' => $appointment->status,
                    'image' => $appointment->doctor->user->profile_photo_path,
                ];
            });
            
        return response()->json($appointments);
    }
    
    /**
     * Get patient profile.
     */
    public function profile()
    {
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->firstOrFail();
        
        return response()->json([
            'id' => $patient->id,
            'name' => $user->name,
            'email' => $user->email,
            'image' => $user->profile_photo_path,
            'gender' => $patient->gender,
            'age' => $patient->age,
            'phone' => $patient->phone,
            'address' => $patient->address,
            'medicalHistory' => $patient->medical_history,
            'profileCompletion' => $this->calculateProfileCompletion($patient),
        ]);
    }
    
    /**
     * Update patient profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->firstOrFail();
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'gender' => 'sometimes|string|in:male,female,other',
            'age' => 'sometimes|integer|min:0|max:120',
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:500',
            'medicalHistory' => 'sometimes|string|max:2000',
        ]);
        
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
            $user->save();
            unset($validated['name']);
        }
        
        $patient->role_id = $user->role_id;

        // Map request fields to database fields
        if (isset($validated['medicalHistory'])) {
            $validated['medical_history'] = $validated['medicalHistory'];
            unset($validated['medicalHistory']);
        }
        
        $patient->update($validated);
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'profileCompletion' => $this->calculateProfileCompletion($patient),
        ]);
    }
    
    /**
     * Calculate profile completion percentage.
     */
    private function calculateProfileCompletion(Patient $patient)
    {
        $fields = [
            $patient->user->name,
            $patient->user->email,
            $patient->gender,
            $patient->age,
            $patient->phone,
            $patient->address,
            $patient->role_id,
            $patient->medical_history,
            $patient->user->profile_photo_path,
        ];
        
        $filledFields = array_filter($fields, function ($field) {
            return !empty($field);
        });
        
        return round((count($filledFields) / count($fields)) * 100);
    }
}
