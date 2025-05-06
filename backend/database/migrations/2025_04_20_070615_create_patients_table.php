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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('phone');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->timestamps();
            if (!Schema::hasColumn('patients', 'role_id')) {
                $table->enum('role_id', ['doctor', 'patient'])->nullable();
            }
        });
        // Update the role_id in patients table with the corresponding role_id from users table
        DB::statement('UPDATE patients SET role_id = (SELECT role_id FROM users WHERE users.id = patients.user_id)');
        
        // Set default value for any null role_id
        DB::statement('UPDATE patients SET role_id = "patient" WHERE role_id IS NULL');
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn('role_id');
        });
    }
};
