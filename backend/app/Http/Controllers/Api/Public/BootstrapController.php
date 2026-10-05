<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\SeoMeta;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class BootstrapController extends Controller
{
    /**
     * Retorna em uma única requisição todos os dados necessários para o carregamento instantâneo do frontend.
     */
    public function index(): JsonResponse
    {
        $settings = Setting::pluck('value', 'key');
        $services = Service::where('is_active', true)->orderBy('order')->get();
        $seoMetas = SeoMeta::all()->keyBy('page_slug');
        $pages = Page::with('sections')->get()->keyBy('slug');

        return response()->json([
            'success' => true,
            'data' => [
                'settings' => $settings,
                'services' => $services,
                'seo' => $seoMetas,
                'pages' => $pages,
            ]
        ]);
    }
}
