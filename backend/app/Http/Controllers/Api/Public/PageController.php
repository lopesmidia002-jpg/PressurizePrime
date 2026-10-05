<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    /**
     * Retorna os dados, seções e SEO de uma página específica via slug.
     */
    public function show(string $slug): JsonResponse
    {
        $page = Page::with(['sections' => function ($query) {
            $query->where('is_active', true)->orderBy('order');
        }, 'seo'])->where('slug', $slug)->first();

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Página não encontrada.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $page
        ]);
    }
}
