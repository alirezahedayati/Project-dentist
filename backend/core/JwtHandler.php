<?php

namespace Core;

class JwtHandler
{
    private static $secret_key = 'yJ6knrsERHMBZuZAKj5GxQfXse96bjX3';
    private static $algorithm = 'HS256';

    // Encode function to generate JWT
    public static function encode($payload, $expireTime = 3600)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => self::$algorithm]);
        $payload['exp'] = time() + $expireTime; // Set expiration time

        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret_key, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    // Decode function to validate and decode JWT
    public static function decode($jwt)
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return false; // Invalid token format
        }

        list($header, $payload, $signature) = $parts;
        $decodedHeader = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $header)), true);
        if ($decodedHeader['alg'] !== self::$algorithm) {
            return false; // Invalid algorithm
        }

        $validSignature = hash_hmac('sha256', $header . "." . $payload, self::$secret_key, true);
        $base64UrlValidSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($validSignature));

        if ($base64UrlValidSignature !== $signature) {
            return false; // Signature mismatch
        }

        $decodedPayload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);
        if ($decodedPayload['exp'] < time()) {
            return false; // Token expired
        }

        return $decodedPayload; // Valid token, return payload
    }
}
