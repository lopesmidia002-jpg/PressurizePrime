<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LeadController extends Controller
{
    /**
     * Registra um novo lead oriundo do formulário de orçamento.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:150',
            'whatsapp' => 'required|string|min:10|max:50',
            'neighborhood' => 'required|string|max:100',
            'service_category' => 'nullable|string|max:100',
            'problem_description' => 'required|string|min:5|max:2000',
            'origin_url' => 'nullable|string|max:255',
        ], [
            'name.required' => 'O nome é obrigatório.',
            'name.min' => 'O nome deve ter no mínimo 3 caracteres.',
            'whatsapp.required' => 'O WhatsApp é obrigatório.',
            'neighborhood.required' => 'O bairro é obrigatório.',
            'problem_description.required' => 'A descrição do problema é obrigatória.',
            'problem_description.min' => 'A descrição deve ter no mínimo 5 caracteres.',
        ]);

        $lead = Lead::create([
            'name' => $validated['name'],
            'whatsapp' => $validated['whatsapp'],
            'neighborhood' => $validated['neighborhood'],
            'service_category' => $validated['service_category'] ?? null,
            'problem_description' => $validated['problem_description'],
            'status' => 'novo',
            'origin_url' => $validated['origin_url'] ?? null,
        ]);

        Log::info("Novo Lead Pressurize Prime recebido #{$lead->id} - {$lead->name} ({$lead->neighborhood})");

        try {
            $setting = \App\Models\Setting::where('key', 'contact_email')->first();
            $recipient = $setting ? $setting->value : 'contato@pressurizeprime.com.br';
            \Illuminate\Support\Facades\Mail::to($recipient)->send(new \App\Mail\NewLeadNotification($lead));
        } catch (\Exception $e) {
            Log::error("Erro ao enviar email para o lead #{$lead->id}: " . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Orçamento solicitado com sucesso! Entraremos em contato via WhatsApp.',
            'data' => $lead,
        ], 201);
    }
}
