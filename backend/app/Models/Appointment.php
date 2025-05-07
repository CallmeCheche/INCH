<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    /** @use HasFactory<\Database\Factories\AppointmentFactory> */
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'date',
        'time',
        'type',
        'notes',
        'fee',
        'commission_fee',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'fee' => 'decimal:2',
        'commission_fee' => 'decimal:2'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($appointment) {
            if ($appointment->fee > 0) {
                $appointment->commission_fee = $appointment->fee * 0.20; // 20% commission
            }
        });

        static::updating(function ($appointment) {
            if ($appointment->isDirty('fee')) {
                $appointment->commission_fee = $appointment->fee * 0.20;
            }
        });
    }
}
