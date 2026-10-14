<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Libera a rota apenas para usuários com papel "admin" (ex.: gestão de usuários do painel).
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Acesso restrito a administradores.',
            ], 403);
        }

        return $next($request);
    }
}
