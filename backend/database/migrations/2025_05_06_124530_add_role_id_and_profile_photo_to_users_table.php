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
        Schema::table('users', function (Blueprint $table) {
            // Add role_id field if it doesn't exist
            if (!Schema::hasColumn('users', 'role_id')) {
                $table->enum('role_id', ['doctor', 'patient'])->nullable();
            }
            
            // Add profile_photo_path field if it doesn't exist
            if (!Schema::hasColumn('users', 'profile_photo_path')) {
                $table->string('profile_photo_path')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role_id', 'profile_photo_path']);
        });
    }
};