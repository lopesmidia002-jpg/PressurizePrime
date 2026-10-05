<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'home',
                'title' => 'Home Institucional',
                'hero_title' => 'Água na temperatura certa e na pressão que você merece.',
                'hero_subtitle' => 'Conserto, venda e instalação de pressurizadores e aquecedores a gás, solar e elétrico em São Paulo. Atendimento rápido, peças originais e garantia formal em todos os serviços.',
                'hero_cta_primary' => 'Chamar no WhatsApp',
                'hero_cta_secondary' => 'Ligar agora',
                'microcopy' => 'Atendimento técnico de segunda a sexta, das 8h às 19h. Conserto em até 24 horas.',
                'sections' => [
                    [
                        'section_key' => 'trust_badges',
                        'title' => 'Nossos Selos de Confiança',
                        'content' => [
                            ['label' => '+10 anos de experiência', 'description' => 'Técnicos com vivência prática no setor residencial e predial'],
                            ['label' => 'Conserto em até 24h', 'description' => 'Resolução ágil para você não ficar sem banho quente'],
                            ['label' => 'Até 10x sem juros', 'description' => 'Facilidade de pagamento no cartão de crédito'],
                            ['label' => 'Garantia de 3 meses', 'description' => 'Garantia real em peças substituídas e mão de obra']
                        ],
                        'order' => 1
                    ],
                    [
                        'section_key' => 'about',
                        'title' => 'Quem Somos',
                        'subtitle' => 'Especialistas em pressurização hidráulica e aquecimento de água em São Paulo.',
                        'content' => [
                            'paragraph1' => 'A Pressurize Prime nasceu com um propósito claro: entregar um serviço técnico honesto, pontual e transparente para quem busca conforto hídrico.',
                            'paragraph2' => 'Trabalhamos exclusivamente com técnicos de verdade, munidos de equipamentos calibrados e peças originais das principais marcas do mercado.'
                        ],
                        'order' => 2
                    ],
                    [
                        'section_key' => 'how_it_works',
                        'title' => 'Como Funciona Nosso Atendimento',
                        'subtitle' => 'Processo transparente em 3 etapas simples para resolver seu problema sem surpresas.',
                        'content' => [
                            ['step' => 1, 'title' => 'Você entra em contato', 'desc' => 'Descreve o problema por WhatsApp ou ligação e enviamos uma prévia de agendamento.'],
                            ['step' => 2, 'title' => 'Vistoria técnica no local', 'desc' => 'Avaliamos a infraestrutura, diagnosticamos o defeito real e fornecemos orçamento transparente.'],
                            ['step' => 3, 'title' => 'Problema resolvido com garantia', 'desc' => 'Executamos o conserto ou instalação na hora ou em até 24h, com teste de pressão e garantia de 3 meses.']
                        ],
                        'order' => 3
                    ]
                ]
            ],
            [
                'slug' => 'pressurizador',
                'title' => 'Pressurizador de Água',
                'hero_title' => 'Pressurizador de Água com defeito ou sem pressão no chuveiro?',
                'hero_subtitle' => 'Conserto, venda e instalação de pressurizadores em São Paulo. Atendimento técnico especializado para restabelecer a pressão ideal da sua casa em até 24 horas.',
                'hero_cta_primary' => 'Chamar no WhatsApp',
                'hero_cta_secondary' => 'Ligar agora',
                'microcopy' => 'Técnicos com mais de 10 anos de experiência em pressurização residencial e predial.',
                'sections' => []
            ],
            [
                'slug' => 'aquecedor-a-gas',
                'title' => 'Aquecedor a Gás',
                'hero_title' => 'Aquecedor a Gás com defeito, código de erro ou não esquenta a água?',
                'hero_subtitle' => 'Conserto, manutenção preventiva e instalação técnica de aquecedores a gás em São Paulo. Rigor técnico conforme a norma NBR 13103 para máxima segurança da sua família.',
                'hero_cta_primary' => 'Chamar no WhatsApp',
                'hero_cta_secondary' => 'Ligar agora',
                'microcopy' => 'Segurança em primeiro lugar: técnicos capacitados para gases GN e GLP.',
                'sections' => []
            ],
            [
                'slug' => 'aquecedor-solar',
                'title' => 'Aquecedor Solar e Boiler',
                'hero_title' => 'Aquecedor Solar com água fria ou boiler apresentando vazamento?',
                'hero_subtitle' => 'Manutenção corretiva e preventiva em sistemas solares térmicos e boilers de acumulação em São Paulo. Recupere a economia de energia e o conforto de água quente.',
                'hero_cta_primary' => 'Chamar no WhatsApp',
                'hero_cta_secondary' => 'Ligar agora',
                'microcopy' => 'Inspeção completa de coletores, bojo térmico e resistência de apoio.',
                'sections' => []
            ],
            [
                'slug' => 'aquecedor-eletrico',
                'title' => 'Aquecedor Elétrico e Boiler',
                'hero_title' => 'Boiler Elétrico não aquece ou desarmando o disjuntor da casa?',
                'hero_subtitle' => 'Conserto e instalação de boilers elétricos centrais e aquecedores de passagem em São Paulo. Eletricista e encanador integrados no mesmo atendimento.',
                'hero_cta_primary' => 'Chamar no WhatsApp',
                'hero_cta_secondary' => 'Ligar agora',
                'microcopy' => 'Diagnóstico elétrico e hidráulico completo com garantia de 3 meses.',
                'sections' => []
            ],
        ];

        foreach ($pages as $pData) {
            $sections = $pData['sections'] ?? [];
            unset($pData['sections']);

            $page = Page::updateOrCreate(
                ['slug' => $pData['slug']],
                $pData
            );

            foreach ($sections as $sData) {
                PageSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'section_key' => $sData['section_key'],
                    ],
                    [
                        'title' => $sData['title'] ?? null,
                        'subtitle' => $sData['subtitle'] ?? null,
                        'content' => $sData['content'] ?? null,
                        'order' => $sData['order'] ?? 0,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
