FROM php:8.4 as php

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libsqlite3-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_sqlite zip

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-interaction --optimize-autoloader --no-dev

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]