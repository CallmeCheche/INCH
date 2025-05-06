<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $appointments = [];
        
        // Vérifier si l'utilisateur est un médecin ou un patient
        $doctor = Doctor::where('user_id', $user->id)->first();
        $patient = Patient::where('user_id', $user->id)->first();
        
        if ($doctor) {
            $query = Appointment::with('patient.user')
                ->where('doctor_id', $doctor->id);
        } elseif ($patient) {
            $query = Appointment::with('doctor.user')
                ->where('patient_id', $patient->id);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        // Filtrer par date si spécifié
        if ($request->has('date')) {
            $query->where('date', $request->date);
        }
        
        // Filtrer par statut si spécifié
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        // Filtrer par type si spécifié
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        
        $appointments = $query->orderBy('date')->orderBy('time')->get();
        
        // Formater les données selon le type d'utilisateur
        $formattedAppointments = $appointments->map(function ($appointment) use ($doctor) {
            $data = [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'time' => $appointment->time,
                'type' => $appointment->type,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'fee' => $appointment->fee,
            ];
            
            if ($doctor) {
                $data['patientName'] = $appointment->patient->user->name;
                $data['patientImage'] = $appointment->patient->user->profile_photo_path;
                $data['patientId'] = $appointment->patient->id;
            } else {
                $data['doctorName'] = $appointment->doctor->user->name;
                $data['doctorImage'] = $appointment->doctor->user->profile_photo_path;
                $data['doctorId'] = $appointment->doctor->id;
                $data['specialty'] = $appointment->doctor->specialty;
            }
            
            return $data;
        });
        
        return response()->json($formattedAppointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppointmentRequest $request)
    {
        $user = Auth::user();
        $patient = Patient::where('user_id', $user->id)->first();
        
        if (!$patient) {
            return response()->json(['message' => 'Only patients can book appointments'], 403);
        }
        
        $appointment = Appointment::create([
            'patient_id' => $patient->id,
            'doctor_id' => $request->doctor_id,
            'date' => $request->date,
            'time' => $request->time,
            'type' => $request->type,
            'status' => 'pending',
            'notes' => $request->notes,
            'fee' => $request->fee,
        ]);
        
        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        $user = Auth::user();
        
        // Vérifier si l'utilisateur est autorisé à voir ce rendez-vous
        $doctor = Doctor::where('user_id', $user->id)->first();
        $patient = Patient::where('user_id', $user->id)->first();
        
        if (($doctor && $appointment->doctor_id == $doctor->id) || 
            ($patient && $appointment->patient_id == $patient->id)) {
            
            $appointment->load('doctor.user', 'patient.user');
            
            $data = [
                'id' => $appointment->id,
                'date' => $appointment->date,
                'time' => $appointment->time,
                'type' => $appointment->type,
                'status' => $appointment->status,
                'notes' => $appointment->notes,
                'fee' => $appointment->fee,
                'doctorName' => $appointment->doctor->user->name,
                'doctorImage' => $appointment->doctor->user->profile_photo_path,
                'doctorId' => $appointment->doctor->id,
                'specialty' => $appointment->doctor->specialty,
                'patientName' => $appointment->patient->user->name,
                'patientImage' => $appointment->patient->user->profile_photo_path,
                'patientId' => $appointment->patient->id,
            ];
            
            return response()->json($data);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        $user = Auth::user();
        
        // Vérifier si l'utilisateur est autorisé à modifier ce rendez-vous
        $doctor = Doctor::where('user_id', $user->id)->first();
        $patient = Patient::where('user_id', $user->id)->first();
        
        if (($doctor && $appointment->doctor_id == $doctor->id) || 
            ($patient && $appointment->patient_id == $patient->id)) {
            
            // Les médecins peuvent changer tous les champs
            if ($doctor) {
                $appointment->update($request->validated());
            } 
            // Les patients ne peuvent changer que certains champs
            else if ($patient) {
                $appointment->update([
                    'notes' => $request->notes,
                    'review' => $request->review,
                    'rating' => $request->rating,
                ]);
            }
            
            return response()->json($appointment);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $user = Auth::user();
        
        // Vérifier si l'utilisateur est autorisé à supprimer ce rendez-vous
        $doctor = Doctor::where('user_id', $user->id)->first();
        $patient = Patient::where('user_id', $user->id)->first();
        
        if (($doctor && $appointment->doctor_id == $doctor->id) || 
            ($patient && $appointment->patient_id == $patient->id)) {
            
            $appointment->delete();
            return response()->json(null, 204);
        }
        
        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
