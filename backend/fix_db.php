<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Page;
use App\Models\PageSection;

$page = Page::where('slug', 'duvidas')->first();
if ($page) {
    $section = PageSection::where('page_id', $page->id)->where('section_key', 'duvidas')->first();
    if ($section) {
        $content = $section->content;
        $items = $content['items'] ?? [];
        if (count($items) == 0) {
            $items = [
                ['title' => "De quanto em quanto tempo devo fazer manutenção?", 'desc' => "O recomendado pelos fabricantes é uma revisão por ano, ou conforme o manual do seu modelo."],
                ['title' => "Meu aquecedor desliga no meio do banho. O que pode ser?", 'desc' => "Pode ser sensor, exaustão obstruída, baixa pressão de água ou gás. Só o diagnóstico no local confirma."],
                ['title' => "Vocês trabalham com quais marcas?", 'desc' => "Atendemos aquecedores Rinnai, Rheem e Komeco, entre outras."],
                ['title' => "Atendem gás natural e GLP?", 'desc' => "Sim, os dois. Só não executamos tubulação de gás: o ponto precisa estar pronto no local."],
                ['title' => "Qual a garantia?", 'desc' => "3 meses em peças e 30 dias na mão de obra."]
            ];
            $content['items'] = $items;
            $section->content = $content;
            $section->save();
            echo "Successfully injected 5 items into duvidas.\n";
        } else {
            echo "Items already exist in DB.\n";
        }
    } else {
        echo "Duvidas section not found.\n";
    }
} else {
    echo "Page not found.\n";
}
