<?php

namespace Core;

require_once 'Response.php';

use Core\Response;

class Controller
{
    protected $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    protected function authenticate()
    {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            return Response::json(['error' => 'لطفا به حساب کاربری خود وارد شوید.'], 401);
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $payload = JwtHandler::decode($token);

        if (!$payload) {
            return Response::json(['error' => 'توکن دسترسی منقضی یا نامعتبر است.'], 401);
        }

        return $payload;
    }

    protected function respond($data, $status = 200)
    {
        return Response::json($data, $status);
    }
}
