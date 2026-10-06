<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = \App\Models\Page::where('slug', 'home')->first();
$sections = $page->sections ?? [];

$sections['whyUs'] = [
    'title' => 'Por que escolher a Pressurize Prime?',
    'subtitle' => 'Enquanto outros barateiam a mão de obra e somem quando surgem problemas, nós assumimos compromisso integral com o resultado.',
    'items' => [
        [
            'title' => 'Resolvemos de primeira',
            'desc' => 'Diagnóstico técnico antes de trocar qualquer peça. Você paga pelo que realmente precisa, sem adivinhações ou tentativa e erro.'
        ],
        [
            'title' => 'Se voltar, a gente volta',
            'desc' => 'Nosso pós-atendimento existe para resolver qualquer retorno. Técnico com nome, empresa com endereço físico e serviço garantido.'
        ],
        [
            'title' => 'Rápido de verdade',
            'desc' => 'Atendimento imediato, conserto em até 24 horas e instalação de equipamentos novos sem semanas de espera angustiante.'
        ],
        [
            'title' => 'Gente, não robô',
            'desc' => 'Do primeiro "oi" no WhatsApp até a visita técnica na sua casa, você fala diretamente com profissionais que dominam o assunto.'
        ]
    ]
];

$sections['howItWorks'] = [
    'title' => 'Como Funciona o Atendimento?',
    'subtitle' => 'Processo ágil, sem burocracia e com transparência total de custos antes de qualquer reparo.',
    'cta' => 'Chamar no WhatsApp e Contar Meu Problema',
    'items' => [
        [
            'title' => 'Conte o problema',
            'desc' => 'Entre em contato pelo WhatsApp ou telefone. Envie uma foto ou vídeo do seu pressurizador ou aquecedor para orientarmos o técnico antes da visita.'
        ],
        [
            'title' => 'Vistoria e orçamento',
            'desc' => 'O técnico avalia no local e passa o valor exato antes de iniciar o conserto. Aprovou o serviço? A taxa de vistoria e locomoção não é cobrada.'
        ],
        [
            'title' => 'Problema resolvido',
            'desc' => 'Conserto ou instalação realizado de imediato ou em até 24 horas úteis, com garantia de 3 meses em peças e 30 dias em mão de obra.'
        ]
    ]
];

$page->update(['sections' => $sections]);
echo "Home sections updated.\n";
