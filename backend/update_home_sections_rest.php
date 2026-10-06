<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = \App\Models\Page::where('slug', 'home')->first();
$sections = $page->sections ?? [];

$sections['commitments'] = [
    'title' => 'O que você pode cobrar da gente',
    'subtitle' => 'Regras claras, garantia por escrito e respeito ao seu investimento desde o primeiro contato.',
    'items' => [
        ['title' => 'Orçamento antes do serviço', 'desc' => 'Você sabe o valor exato antes de qualquer componente ser trocado. Sem surpresas na conta final.'],
        ['title' => 'Vistoria que sai de graça', 'desc' => 'Aprovando o serviço com o nosso técnico durante a visita, a taxa de vistoria e locomoção não é cobrada.'],
        ['title' => 'Garantia de verdade', 'desc' => '3 meses de garantia integral nas peças instaladas e 30 dias na mão de obra com assistência dedicada.'],
        ['title' => 'Pagamento facilitado', 'desc' => 'Parcelamento em até 10x sem juros no cartão de crédito, com opção de pagamento no Pix ou débito.']
    ]
];

$sections['coverage'] = [
    'title' => 'Regiões Atendidas em São Paulo',
    'subtitle' => 'Nossos técnicos atuam com rotas diárias otimizadas na capital e na Grande São Paulo, garantindo agilidade no deslocamento e pontualidade na visita técnica.',
    'badge' => 'Atendimento prioritário em condomínios e residências de médio e alto padrão'
];

$sections['faq'] = [
    'title' => 'Dúvidas Frequentes',
    'subtitle' => 'Tudo o que você precisa saber antes de chamar um técnico.',
    'items' => [
        ['title' => 'Vocês cobram taxa de visita?', 'desc' => 'A taxa de vistoria é isenta caso o serviço seja aprovado no local. Se não for aprovado, é cobrada apenas uma taxa mínima de deslocamento técnico.'],
        ['title' => 'As peças usadas são originais?', 'desc' => 'Sim. Trabalhamos exclusivamente com peças originais e homologadas pelas fabricantes (Rowa, Komeco, Rheem, etc) para garantir a segurança da instalação e a garantia.'],
        ['title' => 'Quanto tempo demora o conserto?', 'desc' => '90% dos reparos são feitos na mesma visita, pois nossos técnicos andam com os componentes de maior desgaste no carro. Caso falte uma peça específica, retornamos em até 24h úteis.']
    ]
];

$sections['homeLead'] = [
    'title' => 'Solicite uma Vistoria Técnica',
    'subtitle' => 'Preencha os dados abaixo e entraremos em contato rapidamente para agendar a visita.',
    'cta' => 'Agendar Visita Agora'
];

$sections['finalCta'] = [
    'title' => 'O banho perfeito não pode esperar.',
    'subtitle' => 'Equipamento parado é conforto perdido. Nossa equipe técnica está de prontidão para devolver a pressão e a temperatura ideal para a sua água.',
    'cta' => 'Agendar Visita Pelo WhatsApp'
];

$page->update(['sections' => $sections]);
echo "Rest of Home sections updated.\n";
