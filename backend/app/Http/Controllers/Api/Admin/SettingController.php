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

        // IDs de rastreamento viram URL de script no site: só aceita o formato oficial do Google (ou vazio)
        $trackingFormats = [
            'ga4_measurement_id' => '/^G-[A-Z0-9]{4,20}$/',
            'gtm_container_id' => '/^GTM-[A-Z0-9]{4,20}$/',
        ];
        foreach ($payload['settings'] as $index => $item) {
            $format = $trackingFormats[$item['key']] ?? null;
            $value = trim((string) ($item['value'] ?? ''));
            if ($format && $value !== '' && !preg_match($format, $value)) {
                return response()->json([
                    'success' => false,
                    'message' => "Formato inválido para {$item['key']}.",
                    'errors' => ["settings.{$index}.value" => ["Formato inválido para {$item['key']}."]],
                ], 422);
            }
        }

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
