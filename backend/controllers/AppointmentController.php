<?php

namespace Controllers;

require_once '../core/Controller.php';
require_once '../core/Database.php';
require_once '../core/Request.php';
require_once '../core/Validator.php';
require_once '../core/JwtHandler.php';

use PDO;

use Core\Controller;
use Core\Request;
use Core\Validator;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $payload = $this->authenticate();

        // Fetch the user by user_id
        $stmt = $this->db->query('SELECT * FROM users WHERE id = ?', [$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['is_active'] || !$user['is_admin']) {
            return $this->respond(['error' => 'انجام این عملیات توسط شما مجاز نیست.'], 403);
        }

        $appointments = $this->db->query(
            "SELECT id, first_name, last_name, mobile_number, type, reserved_at, reserved_for, created_at, updated_at FROM appointments"
        )->fetchAll();

        return $this->respond($appointments);
    }

    public function make(Request $request)
    {
        $payload = $this->authenticate();

        // Fetch the user by user_id
        $stmt = $this->db->query('SELECT * FROM users WHERE id = ?', [$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['is_active']) {
            return $this->respond(['error' => 'لطفا به حساب کاربری خود وارد شوید.'], 401);
        }

        $data = $request->getBody();

        // Validate the input
        $validator = new Validator($data, [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'mobile' => 'required|mobile',
            'type' => 'required|enum:checkup,cosmetic',
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Make an appointment
        $stmt = $this->db->query(
            'INSERT INTO appointments (first_name, last_name, mobile_number, type, user_id) VALUES (?, ?, ?, ?, ?)',
            [$data['first_name'], $data['last_name'], $data['mobile'], $data['type'], $user['id']],
        );

        $type = $data['type'] === 'cosmetic' ? 'زیبایی' : 'عمومی';
        $message = "نوبت معاینه $type شما با موفقیت ثبت شد.";

        return $this->respond(['message' => $message], 201);
    }
}
