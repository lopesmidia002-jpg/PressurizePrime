<?php

namespace Database\Seeders;

use App\Models\SeoMeta;
use Illuminate\Database\Seeder;

class SeoMetaSeeder extends Seeder
{
    public function run(): void
    {
        $metas = [
            [
                'page_slug' => 'home',
                'meta_title' => 'Pressurize Prime | Pressurizador de Água e Aquecedores em São Paulo',
                'meta_description' => 'Conserto, venda e instalação de pressurizadores e aquecedores (gás, solar, elétrico) em São Paulo. Técnicos experientes, atendimento em até 24h e 10x sem juros.',
                'keywords' => 'pressurizador de água, conserto pressurizador sp, aquecedor a gás, aquecedor solar, boiler elétrico sp, pressurize prime',
                'canonical_url' => 'https://pressurizeprime.com.br/',
                'og_title' => 'Pressurize Prime — Especialistas em Pressurização e Água Quente em SP',
                'og_description' => 'Chuveiro fraco ou água fria? Atendimento técnico de segunda a sexta, das 8h às 19h. Conserto em até 24h com garantia.',
                'og_image' => 'https://pressurizeprime.com.br/logo.jpeg',
            ],
            [
                'page_slug' => 'pressurizador',
                'meta_title' => 'Conserto, Instalação e Venda de Pressurizador de Água em SP | Pressurize Prime',
                'meta_description' => 'Especialistas em pressurizador de água em São Paulo. Conserto em até 24h, peças originais Rowa, Lorenzetti e Megapress. Vistoria sem custo na aprovação.',
                'keywords' => 'conserto pressurizador de agua sp, instalacao pressurizador rowa, bomba pressurizadora lorenzetti, pressurizador barulhento',
                'canonical_url' => 'https://pressurizeprime.com.br/pressurizador',
                'og_title' => 'Pressurizador de Água em SP | Pressurize Prime',
                'og_description' => 'Pressão fraca no chuveiro? Chame a Pressurize Prime. Diagnóstico rápido, peças com garantia e 10x sem juros.',
                'og_image' => 'https://pressurizeprime.com.br/images/pressurizador.jpg',
            ],
            [
                'page_slug' => 'aquecedor-a-gas',
                'meta_title' => 'Conserto e Instalação de Aquecedor a Gás em SP | Pressurize Prime',
                'meta_description' => 'Assistência técnica de aquecedor a gás em São Paulo. Rigor técnico NBR 13103, gases GN e GLP. Rinnai, Rheem, Komeco e Bosch. Atendimento imediato.',
                'keywords' => 'conserto aquecedor a gas sp, manutencao rinnai sp, aquecedor rheem nao esquenta, cheiro de gas aquecedor sp',
                'canonical_url' => 'https://pressurizeprime.com.br/aquecedor-a-gas',
                'og_title' => 'Aquecedor a Gás — Conserto e Instalação com Segurança em SP',
                'og_description' => 'Segurança em primeiro lugar. Técnicos certificados para aquecedores a gás digitais e mecânicos em toda a capital paulista.',
                'og_image' => 'https://pressurizeprime.com.br/images/aquecedor-a-gas.jpg',
            ],
            [
                'page_slug' => 'aquecedor-solar',
                'meta_title' => 'Manutenção de Aquecedor Solar e Boiler em SP | Pressurize Prime',
                'meta_description' => 'Conserto e manutenção de aquecedor solar e boiler em São Paulo. Troca de resistência, termostato e limpeza de placas térmicas. Recupere a economia.',
                'keywords' => 'manutencao aquecedor solar sp, boiler vazando sp, troca resistencia boiler solar, heliotek soletrol conserto',
                'canonical_url' => 'https://pressurizeprime.com.br/aquecedor-solar',
                'og_title' => 'Aquecedor Solar e Boiler — Manutenção Especializada em SP',
                'og_description' => 'Água quente abundante e economia de energia restaurada. Técnicos com mais de 10 anos de vivência prática.',
                'og_image' => 'https://pressurizeprime.com.br/images/aquecedor-solar.jpg',
            ],
            [
                'page_slug' => 'aquecedor-eletrico',
                'meta_title' => 'Conserto de Aquecedor Elétrico e Boiler em SP | Pressurize Prime',
                'meta_description' => 'Assistência técnica para boiler e aquecedor elétrico em São Paulo. Eletricista e encanador no mesmo atendimento. Cumulus, Cardal e Lorenzetti.',
                'keywords' => 'conserto boiler eletrico sp, aquecedor central eletrico cumulus, troca termostato boiler, desarmando disjuntor chuveiro',
                'canonical_url' => 'https://pressurizeprime.com.br/aquecedor-eletrico',
                'og_title' => 'Aquecedor Elétrico e Boiler — Reparo Especializado em SP',
                'og_description' => 'Elimine sobrecargas e riscos elétricos com técnicos qualificados. Atendimento ágil e parcelamento em 10x sem juros.',
                'og_image' => 'https://pressurizeprime.com.br/images/aquecedor-eletrico.jpg',
            ],
        ];

        foreach ($metas as $meta) {
            SeoMeta::updateOrCreate(
                ['page_slug' => $meta['page_slug']],
                $meta
            );
        }
    }
}
