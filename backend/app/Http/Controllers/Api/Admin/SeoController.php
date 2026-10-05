<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    /**
     * Retorna lista de configurações SEO de todas as páginas.
     */
    public function index(): JsonResponse
    {
        $seo = SeoMeta::all();

        return response()->json([
            'success' => true,
            'data' => $seo,
        ]);
    }

    /**
     * Exibe o SEO de uma página específica.
     */
    public function show(string $slug): JsonResponse
    {
        $seo = SeoMeta::where('page_slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $seo,
        ]);
    }

    /**
     * Atualiza os metadados de SEO individual de uma página.
     */
    public function update(Request $request, string $slug): JsonResponse
    {
        $validated = $request->validate([
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'keywords' => 'nullable|string',
            'canonical_url' => 'nullable|string|url',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|string',
            'schema_markup' => 'nullable|array',
        ]);

        $seo = SeoMeta::updateOrCreate(
            ['page_slug' => $slug],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Configurações de SEO atualizadas com sucesso.',
            'data' => $seo,
        ]);
    }
}
