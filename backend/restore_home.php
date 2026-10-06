<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = \App\Models\Page::where('slug', 'home')->first();
$page->update([
    'hero_title' => 'Banho forte e água quente, sem esperar dias por um técnico.',
    'hero_subtitle' => 'Venda, instalação e manutenção de pressurizadores e aquecedores a gás, solar e elétricos em São Paulo. Atendimento imediato, técnicos experientes e conserto em até 24 horas.',
    'hero_cta_primary' => 'Chamar no WhatsApp',
    'hero_cta_secondary' => 'Ligar agora',
    'microcopy' => 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.'
]);
echo "Home page hero texts restored successfully.\n";
