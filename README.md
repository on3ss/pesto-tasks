# Pesto Task MGMT

## Setup Backend
### Requirements
- PHP 8.3
- Composer 2 Installed

### Running backend
- In your terminal change working directory to backend
- `composer install` to install dependencies
- `cp .env.example .env` to create environment file from example.
- Define db connections in .env and define APP_URL, FRONTEND_URL, SESSION_DOMAIN and SANCTUM_STATEFUL_DOMAINS 
- `php artisan key:generate` to generate application key
- `php artisan migrate --seed` to create tables and seed initial data
- `php artisan serve` to serve

#### Note about environment files
- APP_URL, FRONTEND_URL, SESSION_DOMAIN and SANCTUM_STATEFUL_DOMAINS must have the same top level domain
- APP_URL is the url the backend server is hosted at
- FRONTEND_URL is the url the frontend server is hosted at
- SESSION_DOMAIN and SANCTUM_STATEFUL_DOMAINS is required for authentication via sanctun. SESSION_DOMAIN must only have the domain name without the scheme and the port and SANCTUM_STATEFUL_DOMAINS takes a scheme name and a port if required

### Test
You can run the test using `php artisan test`. Tests are stored in backend/tests.

## Setup Frontend
### Requirements
- bun 1.1.12

### Running fronend
- In your terminal change working directory to fronend
- `cp .env.example .env` to create environment file from example
- Change .env as needed
- `bun install` to install dependencies
- `bun dev` to run application 