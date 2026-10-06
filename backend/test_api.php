<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::first();
if (!$user) die("No user\n");

$token = $user->createToken('test')->plainTextToken;
echo "Token: $token\n";

// Now use curl to hit our own API
$ch = curl_init('http://localhost:8000/api/admin/pages/home');
$payload = json_encode([
    'title' => 'Home',
    'hero_title' => 'Test',
    'hero_subtitle' => 'Test',
    'hero_cta_primary' => 'Test',
    'hero_cta_secondary' => 'Test',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Bearer ' . $token,
]);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo "Status: $code\n";
echo "Response: $response\n";
