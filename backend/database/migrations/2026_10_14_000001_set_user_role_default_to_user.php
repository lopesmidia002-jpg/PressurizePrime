<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Dois níveis de acesso ao painel: "admin" (tudo, inclusive gestão de usuários) e "user" (tudo, menos usuários).
     * O padrão da coluna era "admin": qualquer usuário criado sem papel virava administrador.
     */
    public function up(): void
    {
        // Usuários existentes com valores fora do padrão continuam com acesso total
        DB::table('users')->whereNotIn('role', ['admin', 'user'])->orWhereNull('role')->update(['role' => 'admin']);

        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('admin')->change();
        });
    }
};
