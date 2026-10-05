<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Lista todos os serviços (incluindo inativos para o admin).
     */
    public function index(): JsonResponse
    {
        $services = Service::orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    /**
     * Criação de novo serviço.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:100|unique:services,slug',
            'short_description' => 'required|string',
            'full_description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:50',
            'image_url' => 'nullable|string',
            'features' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Serviço cadastrado com sucesso.',
            'data' => $service,
        ], 201);
    }

    /**
     * Exibe um serviço específico.
     */
    public function show(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $service,
        ]);
    }

    /**
     * Atualização de serviço.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => "sometimes|required|string|max:100|unique:services,slug,{$id}",
            'short_description' => 'sometimes|required|string',
            'full_description' => 'nullable|string',
            'icon_name' => 'nullable|string|max:50',
            'image_url' => 'nullable|string',
            'features' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Serviço atualizado com sucesso.',
            'data' => $service,
        ]);
    }

    /**
     * Exclusão de serviço.
     */
    public function destroy(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Serviço excluído com sucesso.',
        ]);
    }
}
