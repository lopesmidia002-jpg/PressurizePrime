<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Lista todas as páginas gerenciáveis.
     */
    public function index(): JsonResponse
    {
        $pages = Page::with('sections')->get();

        return response()->json([
            'success' => true,
            'data' => $pages,
        ]);
    }

    /**
     * Retorna detalhes completos de uma página para edição no CMS.
     */
    public function show(string $slug): JsonResponse
    {
        $page = Page::with(['sections' => function ($q) {
            $q->orderBy('order');
        }, 'seo'])->where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $page,
        ]);
    }

    /**
     * Atualiza títulos, subtítulos e seções da página.
     */
    public function update(Request $request, string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'hero_title' => 'sometimes|required|string|max:255',
            'hero_subtitle' => 'sometimes|required|string',
            'hero_cta_primary' => 'sometimes|required|string|max:100',
            'hero_cta_secondary' => 'sometimes|required|string|max:100',
            'microcopy' => 'nullable|string',
            'sections' => 'nullable|array',
            'sections.*.id' => 'nullable|integer',
            'sections.*.section_key' => 'required_with:sections|string',
            'sections.*.title' => 'nullable|string',
            'sections.*.subtitle' => 'nullable|string',
            'sections.*.content' => 'nullable',
            'sections.*.order' => 'nullable|integer',
            'sections.*.is_active' => 'nullable|boolean',
        ]);

        $page->update($validated);

        if (!empty($validated['sections'])) {
            foreach ($validated['sections'] as $secData) {
                if (!empty($secData['id'])) {
                    PageSection::where('id', $secData['id'])->where('page_id', $page->id)->update([
                        'title' => $secData['title'] ?? null,
                        'subtitle' => $secData['subtitle'] ?? null,
                        'content' => $secData['content'] ?? null,
                        'order' => $secData['order'] ?? 0,
                        'is_active' => $secData['is_active'] ?? true,
                    ]);
                } else {
                    PageSection::updateOrCreate(
                        [
                            'page_id' => $page->id,
                            'section_key' => $secData['section_key'],
                        ],
                        [
                            'title' => $secData['title'] ?? null,
                            'subtitle' => $secData['subtitle'] ?? null,
                            'content' => $secData['content'] ?? null,
                            'order' => $secData['order'] ?? 0,
                            'is_active' => $secData['is_active'] ?? true,
                        ]
                    );
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Página e seções atualizadas com sucesso.',
            'data' => $page->load('sections'),
        ]);
    }
}
