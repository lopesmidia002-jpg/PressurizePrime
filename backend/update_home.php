<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = \App\Models\Page::where('slug', 'home')->first();
$sections = $page->sections ?? [];
$sections['about'] = [
    'title' => 'Técnicos de verdade, com nome e responsabilidade pelo serviço.',
    'content' => 'A Pressurize Prime nasceu de mais de uma década de experiência prática com pressurizadores e aquecedores. Uma equipe que aprendeu o ofício em campo, instalação por instalação, e conhece por dentro os equipamentos que você tem em casa.',
    'quote' => '“Aqui, quem atende você é gente de verdade, do primeiro contato ao pós-serviço. E se algo não ficar certo, a gente volta.”'
];
$page->update(['sections' => $sections]);
echo "Sections updated.\n";
