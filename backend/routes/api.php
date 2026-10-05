<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Public\BootstrapController;
use App\Http\Controllers\Api\Public\PageController as PublicPageController;
use App\Http\Controllers\Api\Public\LeadController as PublicLeadController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\SettingController;
use App\Http\Controllers\Api\Admin\PageController as AdminPageController;
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Admin\SeoController;
use App\Http\Controllers\Api\Admin\LeadController as AdminLeadController;

/*
|--------------------------------------------------------------------------
| Rotas Públicas (Consumidas pelo Site Institucional e Landing Pages)
|--------------------------------------------------------------------------
*/
Route::prefix('public')->group(function () {
    Route::get('/bootstrap', [BootstrapController::class, 'index']);
    Route::get('/pages/{slug}', [PublicPageController::class, 'show']);
    Route::post('/leads', [PublicLeadController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Rotas Administrativas (Painel CMS /admin)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    // Autenticação aberta
    Route::post('/login', [AuthController::class, 'login']);

    // Rotas protegidas por Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Gestão de Identidade, Cores e Configurações Globais
        Route::get('/settings', [SettingController::class, 'index']);
        Route::put('/settings', [SettingController::class, 'update']);

        // Gestão de Páginas e Seções
        Route::get('/pages', [AdminPageController::class, 'index']);
        Route::get('/pages/{slug}', [AdminPageController::class, 'show']);
        Route::put('/pages/{slug}', [AdminPageController::class, 'update']);

        // CRUD de Serviços e Landing Pages
        Route::apiResource('services', ServiceController::class);

        // Gestão de SEO Individual por Página
        Route::get('/seo', [SeoController::class, 'index']);
        Route::get('/seo/{slug}', [SeoController::class, 'show']);
        Route::put('/seo/{slug}', [SeoController::class, 'update']);

        // Gestão de Leads
        Route::get('/leads', [AdminLeadController::class, 'index']);
        Route::patch('/leads/{id}/status', [AdminLeadController::class, 'updateStatus']);
        Route::delete('/leads/{id}', [AdminLeadController::class, 'destroy']);
    });
});
