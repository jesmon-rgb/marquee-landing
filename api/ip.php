<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? null;
$ip = $forwarded ? trim(explode(',', $forwarded)[0]) : null;

echo json_encode(['ip' => $ip]);
