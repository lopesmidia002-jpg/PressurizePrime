<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::first();
echo "Pass match: " . (\Illuminate\Support\Facades\Hash::check('Prime@2026!', $user->password) ? 'YES' : 'NO') . "\n";
