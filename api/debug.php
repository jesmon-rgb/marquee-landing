<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

echo json_encode([
    'xForwardedFor' => $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null,
    'xRealIp' => $_SERVER['HTTP_X_REAL_IP'] ?? null,
    'cfConnectingIp' => $_SERVER['HTTP_CF_CONNECTING_IP'] ?? null,
    'vercelCountry' => $_SERVER['HTTP_X_VERCEL_IP_COUNTRY'] ?? null,
    'vercelCity' => $_SERVER['HTTP_X_VERCEL_IP_CITY'] ?? null,
    'vercelId' => $_SERVER['HTTP_X_VERCEL_ID'] ?? null,
]);
