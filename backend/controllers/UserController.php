<?php

namespace Controllers; //

require_once '../core/Controller.php';
require_once '../core/Database.php';
require_once '../core/Request.php';
require_once '../core/Validator.php';
require_once '../core/JwtHandler.php';

use PDO;

use Core\Controller;
use Core\JwtHandler;
use Core\Request;
use Core\Validator;

class UserController extends Controller
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

        $users = $this->db->query(
            "SELECT id, first_name, last_name, mobile_number, IF(is_admin, 'true', 'false') AS is_admin, IF(is_active, 'true', 'false') AS is_active, created_at, updated_at FROM users"
        )->fetchAll();

        return $this->respond($users);
    }

    public function me(Request $request)
    {
        $payload = $this->authenticate();

        // Fetch the user by user_id
        $stmt = $this->db->query("SELECT id, first_name, last_name, mobile_number, IF(is_admin, 'true', 'false') AS is_admin, IF(is_active, 'true', 'false') AS is_active, created_at, updated_at FROM users WHERE id = ?", [$payload['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !$user['is_active']) {
            return $this->respond(['error' => 'لطفا به حساب کاربری خود وارد شوید.'], 401);
        }

        return $this->respond($user);
    }

    public function register(Request $request)
    {
        $data = $request->getBody();

        // Validate the input
        $validator = new Validator($data, [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'mobile' => 'required|mobile',
            'password' => 'required|string',
            'password_confirm' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        if ($data['password'] != $data['password_confirm']) {
            return $this->respond(['error' => 'رمز عبور‌ها مطابقت ندارند.'], 400);
        }

        // Check if the mobile number is already registered
        $stmt = $this->db->query('SELECT id FROM users WHERE mobile_number = ?', [
            $data['mobile'],
        ]);
        if ($stmt->fetch()) {
            return $this->respond(['error' => 'شماره موبایل قبلاً ثبت شده است.'], 400);
        }

        // Generate a 6-digit activation code
        $activationCode = random_int(100000, 999999);

        // Hash the password and insert the user
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        $stmt = $this->db->query(
            'INSERT INTO users (first_name, last_name, mobile_number, password, is_active, active_code) VALUES (?, ?, ?, ?, ?, ?)',
            [$data['first_name'], $data['last_name'], $data['mobile'], $hashedPassword, 0, $activationCode], // is_active set to 0
        );
        $user_id = $this->db->conn()->lastInsertId();

        // Generate Access Token
        $accessTokenPayload = ['user_id' => $user_id];
        $accessToken = JwtHandler::encode($accessTokenPayload, 86400); // Access token expires in 24 hours

        // Generate Refresh Token
        $refreshTokenPayload = ['user_id' => $user_id];
        $refreshToken = JwtHandler::encode($refreshTokenPayload, 365 * 86400); // Refresh token expires in 365 days

        // Store the refresh token in the database
        $stmt = $this->db->query(
            'UPDATE users SET refresh_token = ? WHERE id = ?',
            [$refreshToken, $user_id],
        );

        // Optionally send the activation code to the user (e.g., via SMS)
        $this->sendActivationCode($data['mobile'], $activationCode);

        return $this->respond([
            'message' => 'ثبت نام با موفقیت انجام شد. لطفاً کد فعال‌سازی ارسال شده را وارد کنید.',
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ], 201);
    }

    // Function to send the activation code (example implementation)
    private function sendActivationCode($mobile, $code)
    {
        // Implement your SMS gateway integration here
        // Example:
        // SMS::send($mobile, "کد فعال‌سازی شما: $code");
    }

    public function verifyCode(Request $request)
    {
        $data = $request->getBody();

        // Validate input
        $validator = new Validator($data, [
            'mobile' => 'required|mobile',
            'active_code' => 'required|numeric|digits:6',
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Check if the active code is correct
        $stmt = $this->db->query(
            'SELECT id FROM users WHERE mobile_number = ? AND active_code = ?',
            [$data['mobile'], $data['active_code']]
        );
        $user = $stmt->fetch();

        if (!$user) {
            return $this->respond(['error' => 'کد فعال‌سازی اشتباه است.'], 400);
        }

        // Activate the user
        $stmt = $this->db->query(
            'UPDATE users SET is_active = 1, active_code = NULL WHERE id = ?',
            [$user['id']]
        );

        // Generate Access and Refresh Tokens
        $accessTokenPayload = ['user_id' => $user['id']];
        $accessToken = JwtHandler::encode($accessTokenPayload, 86400);

        $refreshTokenPayload = ['user_id' => $user['id']];
        $refreshToken = JwtHandler::encode($refreshTokenPayload, 365 * 86400);

        return $this->respond([
            'message' => 'حساب کاربری با موفقیت فعال شد.',
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ], 200);
    }



    public function login(Request $request)
    {
        $data = $request->getBody();

        // Validate input
        $validator = new Validator($data, [
            'mobile' => 'required|mobile',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Fetch the user by mobile number
        $stmt = $this->db->query('SELECT * FROM users WHERE mobile_number = ?', [$data['mobile']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($data['password'], $user['password']) || !$user['is_active']) {
            return $this->respond(['error' => 'شماره موبایل یا رمزعبور نامعتبر است.'], 401);
        }

        // Generate Access Token
        $accessTokenPayload = ['user_id' => $user['id']];
        $accessToken = JwtHandler::encode($accessTokenPayload, 86400); // Access token expires in 24 hours

        // Generate Refresh Token
        $refreshTokenPayload = ['user_id' => $user['id']];
        $refreshToken = JwtHandler::encode($refreshTokenPayload, 365 * 86400); // Refresh token expires in 365 days

        // Store the refresh token in the database
        $stmt = $this->db->query(
            'UPDATE users SET refresh_token = ? WHERE id = ?',
            [$refreshToken, $user['id']],
        );

        return $this->respond([
            'message' => 'ورود با موفقیت انجام شد.',
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ]);
    }

    public function refreshToken(Request $request)
    {
        $data = $request->getBody();

        // Validate input
        $validator = new Validator($data, [
            'refresh_token' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Check if the refresh token is valid
        $stmt = $this->db->query('SELECT * FROM users WHERE refresh_token = ?', [$data['refresh_token']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return $this->respond(['error' => 'توکن تازه‌سازی نامعتبر است.'], 401);
        }

        // Verify if the refresh token has expired
        $decodedRefreshToken = JwtHandler::decode($data['refresh_token']);
        if (!$decodedRefreshToken) {
            return $this->respond(['error' => 'توکن تازه‌سازی منقضی یا نامعتبر است.'], 401);
        }

        // Generate a new access token
        $newAccessTokenPayload = ['user_id' => $user['id']];
        $newAccessToken = JwtHandler::encode($newAccessTokenPayload, 86400); // Access token expires in 24 hours

        return $this->respond([
            'message' => 'تازه‌سازی توکن با موفقیت انجام شد.',
            'access_token' => $newAccessToken,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $data = $request->getBody();

        // Validate mobile
        $validator = new Validator($data, ['mobile' => 'required|mobile']);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Check if the user exists
        $stmt = $this->db->query(
            'SELECT id FROM users WHERE mobile_number = ?',
            [$data['mobile']],
        );
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return $this->respond(['error' => 'کاربر یافت نشد.'], 404);
        }

        // Generate a reset token
        $resetToken = bin2hex(random_bytes(16));

        // Store the reset token in the database
        $stmt = $this->db->query(
            'UPDATE users SET reset_token = ? WHERE mobile_number = ?',
            [$resetToken, $data['mobile']]
        );

        // Normally we should send an SMS with the reset link here
        // For simplicity, I'll return the token in the response
        return $this->respond(['message' => 'لینک بازنشانی رمز عبور ارسال شد.', 'reset_token' => $resetToken]);
    }

    public function resetPassword(Request $request)
    {
        $data = $request->getBody();

        // Validate input
        $validator = new Validator($data, [
            'reset_token' => 'required|string',
            'new_password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return $this->respond(['errors' => $validator->errors()], 400);
        }

        // Check if the reset token is valid
        $stmt = $this->db->query(
            'SELECT id FROM users WHERE reset_token = ?',
            [$data['reset_token']],
        );
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            return $this->respond(['error' => 'توکن بازنشانی نامعتبر است.'], 400);
        }

        // Update the password and clear the reset token
        $hashedPassword = password_hash($data['new_password'], PASSWORD_BCRYPT);
        $stmt = $this->db->query(
            'UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?',
            [$hashedPassword, $data['reset_token']],
        );

        return $this->respond(['message' => 'بازنشانی رمز عبور با موفقیت انجام شد.']);
    }
}
