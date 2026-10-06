<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// 1. SOBRE
$sobre = \App\Models\Page::where('slug', 'sobre')->first();
if ($sobre) {
    $sections = $sobre->sections ?? [];
    $sections['historia'] = [
        'badge' => 'Nossa História',
        'title' => 'Técnicos de verdade, com nome e responsabilidade pelo serviço.',
        'content1' => 'A Pressurize Prime nasceu de mais de uma década de experiência prática com pressurizadores e aquecedores. Uma equipe que aprendeu o ofício em campo, instalação por instalação, e conhece por dentro os equipamentos que você tem em casa.',
        'content2' => 'Aqui, quem atende você é gente de verdade, do primeiro contato ao pós-serviço. E se algo não ficar certo, a gente volta.',
        'items' => [
            ['title' => 'Resolvemos de primeira', 'desc' => 'Diagnóstico técnico antes de trocar qualquer peça. Você paga pelo que precisa, não por tentativa e erro.'],
            ['title' => 'Se voltar, a gente volta', 'desc' => 'Nosso pós-atendimento existe para resolver qualquer retorno. Técnico com nome, empresa com endereço, serviço com garantia.'],
            ['title' => 'Rápido de verdade', 'desc' => 'Atendimento imediato, conserto em até 24h e instalação de equipamentos novos sem semanas de espera.'],
            ['title' => 'Gente, não robô', 'desc' => 'Do WhatsApp à visita, você fala com pessoas que entendem do assunto.']
        ]
    ];
    $sobre->update(['sections' => $sections]);
}

// 2. DIFERENCIAIS
$diferenciais = \App\Models\Page::where('slug', 'diferenciais')->first();
if ($diferenciais) {
    $sections = $diferenciais->sections ?? [];
    $sections['diferenciais'] = [
        'items' => [
            ['title' => 'Qualidade Premium', 'desc' => 'Utilizamos apenas peças originais e ferramentas de alta precisão em nossos serviços.'],
            ['title' => 'Segurança Absoluta', 'desc' => 'Técnicos certificados NR-35 e NR-10. Todos os testes de estanqueidade rigorosamente executados.'],
            ['title' => 'Rapidez no Atendimento', 'desc' => 'Amplo estoque de peças que nos permite resolver a maioria dos problemas na primeira visita.'],
            ['title' => 'Atendimento Humanizado', 'desc' => 'Sem robôs. Você fala diretamente com nossa equipe técnica pronta para ajudar.'],
            ['title' => 'Tecnologia de Ponta', 'desc' => 'Equipamentos de diagnóstico avançado para localizar o problema sem quebra-quebra desnecessário.'],
            ['title' => 'Pontualidade Britânica', 'desc' => 'Chegamos no horário combinado. Valorizamos o seu tempo tanto quanto você.']
        ]
    ];
    $sections['comparativo'] = [
        'title' => 'A Diferença Pressurize Prime',
        'subtitle' => 'Veja por que nossos clientes não trocam nosso serviço.',
        'items' => [
            ['bad' => 'Orçamentos surpresa após iniciar', 'good' => 'Diagnóstico claro e orçamento fixo'],
            ['bad' => 'Peças paralelas sem procedência', 'good' => '100% Peças Originais de fábrica'],
            ['bad' => 'Garantia apenas "de boca"', 'good' => 'Garantia documentada em Nota Fiscal'],
            ['bad' => 'Atrasos e desmarcações', 'good' => 'Pontualidade e respeito à agenda'],
            ['bad' => 'Sujeira após o serviço', 'good' => 'Limpeza completa do local de trabalho']
        ]
    ];
    $diferenciais->update(['sections' => $sections]);
}

// 3. COMO FUNCIONA
$comoFunciona = \App\Models\Page::where('slug', 'como-funciona')->first();
if ($comoFunciona) {
    $sections = $comoFunciona->sections ?? [];
    $sections['processo'] = [
        'items' => [
            ['title' => 'Conte o problema', 'desc' => 'Pelo WhatsApp ou telefone. Se puder, mande uma foto ou vídeo do equipamento.'],
            ['title' => 'Vistoria e orçamento', 'desc' => 'O técnico avalia no local e passa o valor antes de começar. Se você aprovar o serviço, a taxa de vistoria e locomoção não é cobrada.'],
            ['title' => 'Problema resolvido', 'desc' => 'Conserto ou instalação de imediato ou em até 24h, com garantia.']
        ]
    ];
    $sections['regioes'] = [
        'title' => 'Regiões atendidas',
        'subtitle' => 'Atendemos São Paulo e Grande São Paulo, com atendimento prioritário em Brooklin, Vila Olímpia, Vila Clementino, Chácara Santo Antônio, Morumbi, Alphaville, Barueri e Santana de Parnaíba.'
    ];
    $sections['compromissos'] = [
        'title' => 'Nossos compromissos',
        'subtitle' => 'O que você pode cobrar da gente.',
        'items' => [
            ['title' => 'Orçamento antes do serviço.', 'desc' => 'Você sabe o valor antes de qualquer peça ser trocada.'],
            ['title' => 'Vistoria que sai de graça.', 'desc' => 'Aprovou o serviço, a taxa de vistoria e locomoção não é cobrada.'],
            ['title' => 'Garantia de verdade.', 'desc' => '3 meses em peças e 30 dias de mão de obra.'],
            ['title' => 'Pagamento facilitado.', 'desc' => 'Até 10x sem juros no cartão ou desconto no Pix.']
        ]
    ];
    $comoFunciona->update(['sections' => $sections]);
}

echo "All pages sections updated.\n";
