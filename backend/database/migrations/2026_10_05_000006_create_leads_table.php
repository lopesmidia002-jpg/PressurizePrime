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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('whatsapp', 50);
            $table->string('neighborhood', 100);
            $table->string('service_category', 100)->nullable();
            $table->text('problem_description');
            $table->enum('status', ['novo', 'em_atendimento', 'concluido', 'arquivado'])->default('novo');
            $table->string('origin_url')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
