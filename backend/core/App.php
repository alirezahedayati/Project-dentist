<?php

namespace Core;

require_once 'ErrorHandler.php';
require_once 'Router.php';

use Core\Router;
use Core\ErrorHandler;

class App
{
    private Router $router;
    private ErrorHandler $errorHandler;

    public function __construct(Router $router)
    {
        $this->router = $router;
        $this->errorHandler = new ErrorHandler();
    }

    public function run()
    {
        $request = new Request();
        $response = $this->router->dispatch($request);
        echo $response;
    }
}
