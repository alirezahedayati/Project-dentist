<?php

namespace Core;

class Request
{
    private $headers;
    private $body;
    private $method;
    private $uri;

    public function __construct()
    {
        $this->headers = getallheaders();
        $this->body = json_decode(file_get_contents('php://input'), true);
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // فقط بخش مسیر را بگیرید
    }

    public function getMethod()
    {
        return $this->method;
    }

    public function getUri()
    {
        return $this->uri;
    }

    public function getBody()
    {
        return $this->body;
    }

    public function getHeaders()
    {
        return $this->headers;
    }

    public function getParam($key)
    {
        // تقسیم URI به بخش‌ها
        $uriParts = explode('/', trim($this->uri, '/'));

        // جستجو برای مقدار کلید مشخص‌شده
        foreach ($uriParts as $index => $part) {
            if ($part === $key && isset($uriParts[$index + 1])) {
                return $uriParts[$index + 1];
            }
        }

        return null; // اگر پارامتر پیدا نشد
    }
}
