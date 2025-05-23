<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
    $table->id();
    $table->date('date');
    $table->time('time');
    $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
    $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
    $table->foreignId('doctor_id')->constrained('doctors')->onDelete('cascade');
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
