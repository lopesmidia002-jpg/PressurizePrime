#!/bin/sh
set -e

echo "=========================================================="
echo "🚀 [Pressurize Prime] Inicializando Container da API Laravel"
echo "=========================================================="

cd /var/www/html

# Garantir estrutura de diretórios e permissões do storage
mkdir -p storage/framework/cache/data \
         storage/framework/sessions \
         storage/framework/views \
         storage/logs \
         storage/app/public \
         bootstrap/cache
chmod -R 777 storage bootstrap/cache

# Instalar dependências se a pasta vendor não existir
if [ ! -f "vendor/autoload.php" ]; then
    echo "📦 Instalando dependências do Composer..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
else
    echo "✅ Dependências do Composer já instaladas."
fi

# Aguardar o banco de dados MySQL ficar totalmente disponível
echo "⏳ Aguardando banco MySQL ($DB_HOST:$DB_PORT) estar pronto..."
php -r "
\$host = getenv('DB_HOST') ?: 'mysql';
\$port = getenv('DB_PORT') ?: 3306;
\$db   = getenv('DB_DATABASE') ?: 'pressurize_prime';
\$user = getenv('DB_USERNAME') ?: 'root';
\$pass = getenv('DB_PASSWORD') ?: '';

for (\$i = 1; \$i <= 40; \$i++) {
    try {
        \$pdo = new PDO(\"mysql:host=\$host;port=\$port;dbname=\$db;charset=utf8mb4\", \$user, \$pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 3
        ]);
        echo \"✅ Conexão com o banco MySQL estabelecida com sucesso!\\n\";
        exit(0);
    } catch (Throwable \$e) {
        echo \"Tentativa \$i/40: aguardando MySQL... (\" . \$e->getMessage() . \")\\n\";
        sleep(2);
    }
}
echo \"❌ Falha ao conectar ao MySQL após várias tentativas.\\n\";
exit(1);
"

# Gerar APP_KEY caso não configurada
if [ -z "$APP_KEY" ]; then
    echo "🔑 Gerando chave da aplicação (APP_KEY)..."
    php artisan key:generate --force
fi

# Executar migrações do banco de dados e seeders oficiais
echo "🔄 Executando migrações e seeders no MySQL..."
php artisan migrate --force --seed

echo "=========================================================="
echo "✨ [Pressurize Prime] Backend API pronto e operacional!"
echo "🌐 Servidor rodando em: http://0.0.0.0:8000"
echo "=========================================================="

exec php artisan serve --host=0.0.0.0 --port=8000
