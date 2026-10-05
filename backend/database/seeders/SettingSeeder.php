<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Identidade e Visual
            ['key' => 'site_name', 'value' => 'Pressurize Prime', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'Especialistas em Pressurizadores e Aquecedores em São Paulo', 'group' => 'general'],
            ['key' => 'logo_url', 'value' => '/logo.jpeg', 'group' => 'theme'],
            ['key' => 'primary_color', 'value' => '#004b93', 'group' => 'theme'], // Azul Royal institucional
            ['key' => 'secondary_color', 'value' => '#cfa349', 'group' => 'theme'], // Dourado refinado

            // Contato e Atendimento
            ['key' => 'whatsapp_number', 'value' => '(11) 98765-4321', 'group' => 'contact'],
            ['key' => 'whatsapp_raw', 'value' => '5511987654321', 'group' => 'contact'],
            ['key' => 'phone_number', 'value' => '(11) 3456-7890', 'group' => 'contact'],
            ['key' => 'phone_raw', 'value' => '1134567890', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'contato@pressurizeprime.com.br', 'group' => 'contact'],
            ['key' => 'business_hours', 'value' => 'Segunda a Sexta, das 08h às 19h', 'group' => 'contact'],

            // Regiões e Garantias
            ['key' => 'coverage_cities', 'value' => json_encode(['São Paulo', 'Barueri (Alphaville)', 'Santana de Parnaíba', 'Cotia (Granja Viana)', 'Santo André', 'São Bernardo do Campo', 'São Caetano do Sul']), 'group' => 'general'],
            ['key' => 'warranty_terms', 'value' => '3 meses de garantia legal em peças e serviços', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'group' => $setting['group']]
            );
        }
    }
}
