<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\User;
use App\Http\Requests\StoreDoctorRequest;
use App\Http\Requests\UpdateDoctorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $doctors = Doctor::with('user')->get()->map(function ($doctor) {
            return [
                'id' => $doctor->id,
                'name' => $doctor->user->name,
                'specialty' => $doctor->specialty,
                'location' => $doctor->location,
                'rating' => $doctor->rating,
                'reviewCount' => $doctor->review_count,
                'image' => $doctor->user->profile_photo_path,
                'available' => $doctor->available,
                'gender' => $doctor->gender,
            ];
        });

        return response()->json($doctors);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        $doctor = Doctor::create($request->validated());
        return response()->json($doctor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $doctor = Doctor::with('user')->findOrFail($id);
        
        return response()->json([
            'id' => $doctor->id,
            'name' => $doctor->user->name,
            'specialty' => $doctor->specialty,
            'location' => $doctor->location,
            'rating' => $doctor->rating,
            'reviewCount' => $doctor->review_count,
            'image' => $doctor->user->profile_photo_path,
            'available' => $doctor->available,
            'gender' => $doctor->gender,
            'bio' => $doctor->bio,
            'education' => $doctor->education,
            'experience' => $doctor->experience,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor)
    {
        $doctor->update($request->validated());
        return response()->json($doctor);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get dashboard statistics for the doctor.
     */
    public function dashboardStats()
    {
        $user = Auth::user();
        $doctor = Doctor::where('user_id', $user->id)->firstOrFail();
        
        $upcomingAppointments = Appointment::where('doctor_id', $doctor->id)
            ->where('date', '>=', now()->format('Y-m-d'))
            ->count();
            
        $totalPatients = Appointment::where('doctor_id', $doctor->id)
            ->distinct('patient_id')
            ->count('patient_id');
            
        $revenueThisMonth = Appointment::where('doctor_id', $doctor->id)
            ->whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->sum('fee');
            
        return response()->json([
            'upcomingAppointments' => $upcomingAppointments,
            'totalPatients' => $totalPatients,
            'revenueThisMonth' => $revenueThisMonth,
            'currency' => 'XAF',
        ]);
    }
    
    /**
     * Get appointments for the doctor.
     */
    public function appointments()
    {
        $user = Auth::user();
        $doctor = Doctor::where('user_id', $user->id)->firstOrFail();
        
        $appointments = Appointment::with('patient.user')
            ->where('doctor_id', $doctor->id)
            ->orderBy('date')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patientName' => $appointment->patient->user->name,
                    'patientImage' => $appointment->patient->user->profile_photo_path,
                    'date' => $appointment->date,
                    'time' => $appointment->time,
                    'type' => $appointment->type,
                    'status' => $appointment->status,
                ];
            });
            
        return response()->json($appointments);
    }
    
    /**
     * Get patients for the doctor.
     */
    public function patients()
    {
        $user = Auth::user();
        $doctor = Doctor::where('user_id', $user->id)->firstOrFail();
        
        $patientIds = Appointment::where('doctor_id', $doctor->id)
            ->distinct('patient_id')
            ->pluck('patient_id');
            
        $patients = User::whereHas('patient', function ($query) use ($patientIds) {
            $query->whereIn('id', $patientIds);
        })
        ->with('patient')
        ->get()
        ->map(function ($user) {
            return [
                'id' => $user->patient->id,
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->profile_photo_path,
                'gender' => $user->patient->gender,
                'age' => $user->patient->age,
                'phone' => $user->patient->phone,
            ];
        });
            
        return response()->json($patients);
    }
}
