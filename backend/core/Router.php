<?php

namespace Core;

class Router
{
    private $routes = [];

    public function register(string $method, string $route, array $action)
    {
        if (is_array($action) && class_exists($action[0]) && method_exists($action[0], $action[1])) {
            $this->routes[strtoupper($method)][$route] = $action;
        } else {
            throw new \InvalidArgumentException('عملیات نامعتبر است.');
        }
    }

    public function dispatch(Request $request)
    {
        $method = $request->getMethod();
        $uri = $request->getUri();

        if (isset($this->routes[$method][$uri])) {
            [$controller, $method] = $this->routes[$method][$uri];
            $controllerInstance = new $controller();
            return call_user_func([$controllerInstance, $method], $request);
        } else {
            return Response::json(['error' => 'یافت نشد.'], 404);
        }
    }
}
