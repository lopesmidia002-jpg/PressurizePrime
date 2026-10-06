<?php
$ch = curl_init('http://localhost:8000/api/admin/login');
$payload = json_encode([
    'email' => 'admin@pressurizeprime.com.br',
    'password' => 'Prime@2026!'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json'
]);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo "Status: $code\n";
echo "Response: $response\n";
