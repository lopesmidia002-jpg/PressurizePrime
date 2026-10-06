<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$duvidas = \App\Models\Page::where('slug', 'duvidas')->first();
if ($duvidas) {
    $sections = $duvidas->sections ?? [];
    $sections['duvidas'] = [
        'items' => [
            ['title' => 'De quanto em quanto tempo devo fazer manutenção?', 'desc' => 'O recomendado pelos fabricantes é uma revisão por ano, ou conforme o manual do seu modelo.'],
            ['title' => 'Meu aquecedor desliga no meio do banho. O que pode ser?', 'desc' => 'Pode ser sensor, exaustão obstruída, baixa pressão de água ou gás. Só o diagnóstico no local confirma.'],
            ['title' => 'Vocês trabalham com quais marcas?', 'desc' => 'Atendemos aquecedores Rinnai, Rheem e Komeco, entre outras.'],
            ['title' => 'Atendem gás natural e GLP?', 'desc' => 'Sim, os dois. Só não executamos tubulação de gás: o ponto precisa estar pronto no local.'],
            ['title' => 'Qual a garantia?', 'desc' => '3 meses em peças e 30 dias na mão de obra.']
        ]
    ];
    $duvidas->update(['sections' => $sections]);
}

echo "FAQ page sections updated.\n";
