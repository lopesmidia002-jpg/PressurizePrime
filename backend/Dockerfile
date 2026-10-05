FROM php:8.2-cli-alpine

# Instalar dependências de sistema e extensões PHP necessárias para Laravel 11 e MySQL
RUN apk add --no-cache \
    curl \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    mysql-client \
    && docker-php-ext-install pdo pdo_mysql mbstring bcmath xml zip

# Instalar Composer oficial
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos de configuração do Composer primeiro
COPY composer.json ./

# Copiar todo o código do backend
COPY . .

# Criar pastas de armazenamento e dar permissões
RUN mkdir -p storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    storage/app/public \
    bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Copiar script de inicialização e remover CRLF caso criado no Windows
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
