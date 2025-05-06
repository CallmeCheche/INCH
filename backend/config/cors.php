<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:8080'], // ou le port de ton React app
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
