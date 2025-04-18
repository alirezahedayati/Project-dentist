<?php

namespace Core;

require_once 'Response.php';

use Core\Response;

class ErrorHandler
{
    public function __construct()
    {
        set_exception_handler([$this, 'handleException']);
        set_error_handler([$this, 'handleError']);
    }

    public function handleException($exception)
    {
        return Response::json([
            'error' => $exception->getMessage(),
            'code' => $exception->getCode()
        ], 500);
    }

    public function handleError($errno, $errstr, $errfile, $errline)
    {
        return Response::json([
            'error' => $errstr,
            'file' => $errfile,
            'line' => $errline
        ], 500);
    }
}
