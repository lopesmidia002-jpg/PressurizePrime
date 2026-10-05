<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Lista leads com suporte a filtros por status, bairro ou busca textual.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Lead::query()->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('whatsapp', 'like', "%{$search}%")
                  ->orWhere('neighborhood', 'like', "%{$search}%")
                  ->orWhere('problem_description', 'like', "%{$search}%");
            });
        }

        $leads = $query->paginate($request->input('per_page', 20));

        // Estatísticas rápidas de leads
        $stats = [
            'total' => Lead::count(),
            'novo' => Lead::where('status', 'novo')->count(),
            'em_atendimento' => Lead::where('status', 'em_atendimento')->count(),
            'concluido' => Lead::where('status', 'concluido')->count(),
        ];

        return response()->json([
            'success' => true,
            'stats' => $stats,
            'data' => $leads,
        ]);
    }

    /**
     * Atualização do status de atendimento do lead.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:novo,em_atendimento,concluido,arquivado',
        ]);

        $lead = Lead::findOrFail($id);
        $lead->update(['status' => $validated['status']]);

        return response()->json([
            'success' => true,
            'message' => 'Status do lead atualizado com sucesso.',
            'data' => $lead,
        ]);
    }

    /**
     * Excluir lead.
     */
    public function destroy(int $id): JsonResponse
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lead removido com sucesso.',
        ]);
    }
}
