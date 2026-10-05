<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Retorna todas as configurações estruturadas por grupo.
     */
    public function index(): JsonResponse
    {
        $settings = Setting::all();

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Atualiza um lote de configurações (ex: primary_color, secondary_color, logo_url, contatos).
     */
    public function update(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable',
            'settings.*.group' => 'nullable|string',
        ]);

        foreach ($payload['settings'] as $item) {
            Setting::updateOrCreate(
                ['key' => $item['key']],
                [
                    'value' => is_array($item['value']) ? json_encode($item['value']) : $item['value'],
                    'group' => $item['group'] ?? 'general',
                ]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Configurações atualizadas com sucesso.',
            'data' => Setting::pluck('value', 'key'),
        ]);
    }
}
