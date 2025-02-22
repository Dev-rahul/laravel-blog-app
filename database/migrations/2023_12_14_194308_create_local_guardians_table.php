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
        Schema::create('local_guardians', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("contact_number");
            $table->string("relationship");
            $table->string("address");
            $table->bigInteger('student_id')->unsigned();
            $table->foreign('student_id')->references('id')->on('users')
                ->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_guardians');
    }
};
