<?php
$pages = [
    'home' => [
        'hero_title' => 'Banho forte e água quente, sem esperar dias por um técnico.',
        'hero_subtitle' => 'Venda, instalação e manutenção de pressurizadores e aquecedores a gás, solar e elétricos em São Paulo. Atendimento imediato, técnicos experientes e conserto em até 24 horas.',
        'hero_cta_primary' => 'Chamar no WhatsApp',
        'hero_cta_secondary' => 'Ligar agora',
        'microcopy' => 'Atendimento humano desde a primeira mensagem. Sem robô, sem fila.'
    ]
];

foreach ($pages as $slug => $data) {
    \App\Models\Page::updateOrCreate(['slug' => $slug], $data);
}
echo 'Home updated!';
