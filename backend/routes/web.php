<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'Pressurize Prime API',
        'status' => 'online',
        'version' => '1.0.0',
        'timestamp' => now()->toISOString()
    ]);
});

// Suporte universal para servidores Apache em subpasta (HostGator/cPanel)
Route::middleware('api')->group(base_path('routes/api.php'));

