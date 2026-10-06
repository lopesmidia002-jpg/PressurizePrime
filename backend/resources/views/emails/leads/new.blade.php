<x-mail::message>
# Novo Chamado Técnico Recebido!

Olá, equipe da Pressurize Prime.
Um novo cliente acabou de solicitar atendimento pelo site.

**Detalhes do Cliente:**
- **Nome:** {{ $lead->name }}
- **WhatsApp:** {{ $lead->whatsapp }}
- **Bairro:** {{ $lead->neighborhood }}

**Serviço Desejado:**
{{ $lead->service_category }}

**Descrição do Problema:**
> {{ $lead->problem_description }}

<x-mail::button :url="'https://wa.me/'.preg_replace('/[^0-9]/', '', $lead->whatsapp).'?text='.urlencode('Olá '.$lead->name.', vi sua solicitação de orçamento no site da Pressurize Prime.')" color="success">
Falar no WhatsApp
</x-mail::button>

Obrigado,<br>
{{ config('app.name') }}
</x-mail::message>
