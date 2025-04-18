<?php

namespace Controllers;

require_once '../core/Controller.php';
require_once '../core/Request.php';

use Core\Controller;
use Core\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        return $this->respond(['message' => 'Dentist API v1']);
    }
}
