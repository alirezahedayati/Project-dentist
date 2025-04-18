<?php

// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Max-Age: 86400');  // cache for 1 day

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // OK
    exit(0);
}

require_once '../core/App.php';
require_once '../core/Router.php';
require_once '../controllers/AppointmentController.php';
require_once '../controllers/HomeController.php';
require_once '../controllers/UserController.php';
require_once '../controllers/MenuController.php';  // اضافه کردن کنترلر منو
require_once '../controllers/GalleryController.php';  // اضافه کردن کنترلر منو

use Core\App;
use Core\Router;
use Controllers\AppointmentController;
use Controllers\HomeController;
use Controllers\UserController;
use Controllers\MenuController;  // اضافه کردن کلاس کنترلر منو
use Controllers\GalleryController;

// Register routes
$router = new Router();
$router->register('GET', '/', [HomeController::class, 'index']);
$router->register('GET', '/users', [UserController::class, 'index']);
$router->register('GET', '/users/me', [UserController::class, 'me']);
$router->register('POST', '/verify-code', [UserController::class, 'verifyCode']);
$router->register('POST', '/register', [UserController::class, 'register']);
$router->register('POST', '/login', [UserController::class, 'login']);
$router->register('POST', '/refresh-token', [UserController::class, 'refreshToken']);
$router->register('POST', '/forgot-password', [UserController::class, 'forgotPassword']);
$router->register('POST', '/reset-password', [UserController::class, 'resetPassword']);
$router->register('GET', '/appointments', [AppointmentController::class, 'index']);
$router->register('POST', '/appointments', [AppointmentController::class, 'make']);

// اضافه کردن روت برای منوها
$router->register('GET', '/menus', [MenuController::class, 'getMenus']);  // روت جدید برای منوها
$router->register('POST', '/menus', [MenuController::class, 'addMenu']);
$router->register('POST', '/menus/delete', [MenuController::class, 'deleteMenu']);
// Register routes in your main routes file
$router->register('GET', '/gallery-home', [GalleryController::class, 'getGalleryImages']);
$router->register('POST', '/gallery', [GalleryController::class, 'addGalleryImage']);
$router->register('POST', '/gallery/delete', [GalleryController::class, 'deleteGalleryImage']);

// Initialize the app
$app = new App($router);
$app->run();
