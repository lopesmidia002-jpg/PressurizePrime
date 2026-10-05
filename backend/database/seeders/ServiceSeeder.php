<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'slug' => 'pressurizador',
                'title' => 'Pressurizador de Água',
                'short_description' => 'Conserto, venda e instalação de pressurizadores para residências, coberturas e comércios. Pressão ideal em todos os pontos da casa.',
                'full_description' => 'Aumente a pressão dos chuveiros e torneiras com pressurizadores dimensionados corretamente. Diagnóstico de vazamentos e regulagem de fluxostato e pressostato.',
                'icon_name' => 'Gauge',
                'image_url' => '/images/pressurizador.jpg',
                'features' => [
                    'Conserto e substituição em até 24 horas',
                    'Vistoria sem custo na aprovação',
                    'Parcelamento em até 10x sem juros',
                    'Marcas: Rowa, Lorenzetti, Megapress, Schneider, Syllent'
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'slug' => 'aquecedor-a-gas',
                'title' => 'Aquecedor a Gás',
                'short_description' => 'Conserto, manutenção preventiva e instalação técnica conforme NBR 13103. Especialistas em GN e GLP com foco em segurança da sua família.',
                'full_description' => 'Serviço técnico especializado em aquecedores digitais e mecânicos a gás de passagem. Verificação de duto de exaustão, queima e conversão de gás.',
                'icon_name' => 'Flame',
                'image_url' => '/images/aquecedor-a-gas.jpg',
                'features' => [
                    'Atendimento técnico imediato em SP',
                    'Peças originais com 3 meses de garantia',
                    'Rigidez às normas de segurança NBR 13103',
                    'Marcas: Rinnai, Rheem, Komeco, Bosch, Lorenzetti'
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'slug' => 'aquecedor-solar',
                'title' => 'Aquecedor Solar e Boiler',
                'short_description' => 'Manutenção em placas solares, boiler de acumulação e resistência de apoio. Recupere a economia e água quente abundante todos os dias.',
                'full_description' => 'Inspeção completa de coletores solares, termossifão, bomba de circulação e bojo térmico em aço inox.',
                'icon_name' => 'Sun',
                'image_url' => '/images/aquecedor-solar.jpg',
                'features' => [
                    'Recuperação de eficiência térmica',
                    'Substituição de resistência e termostato',
                    'Vistoria no local abatida na aprovação',
                    'Marcas: Soletrol, Mastersol, Heliotek, Cumulus, Transsen'
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'slug' => 'aquecedor-eletrico',
                'title' => 'Aquecedor Elétrico e Boiler',
                'short_description' => 'Conserto e instalação de boilers elétricos centrais e aquecedores de passagem. Eletricista e encanador integrados no mesmo atendimento.',
                'full_description' => 'Diagnóstico de sobrecarga, substituição de disjuntores, fiação reforçada, resistência blindada e válvula de alívio de pressão.',
                'icon_name' => 'Zap',
                'image_url' => '/images/aquecedor-eletrico.jpg',
                'features' => [
                    'Segurança elétrica e hidráulica unificadas',
                    'Troca de resistência blindada e termostatos',
                    'Garantia de 3 meses em peças e serviços',
                    'Marcas: Cumulus, Cardal, Lorenzetti, Kent, Termosul'
                ],
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}
