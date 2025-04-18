<?php

namespace Controllers;

use Core\Controller;
use Core\Database;
use Core\Request;
use Core\Response;
class MenuController extends Controller {

    public function deleteMenu(Request $request)
    {
        // دریافت شناسه از بدنه درخواست (داده‌های POST)
        $id = $request->getBody()['id'] ?? null;

        if ($id) {
            $conn = new Database();
            $db = $conn->conn(); // دریافت اتصال به پایگاه داده
            $stmt = $db->prepare('DELETE FROM menus WHERE id = :id');
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

            if ($stmt->execute()) {
                return Response::json(['message' => 'منو با موفقیت حذف شد.']);
            } else {
                return Response::json(['error' => 'حذف منو انجام نشد.'], 500);
            }
        }

        return Response::json(['error' => 'شناسه منو معتبر نیست.'], 400);
    }


    public function getMenus() {
        try {
            // ایجاد شیء از کلاس Database
            $db = new Database();
            $conn = $db->conn(); // دریافت اتصال به پایگاه داده
            
            // نوشتن کوئری برای واکشی منوها
            $query = "SELECT * FROM menus WHERE is_active = 1 ORDER BY order_m ASC";
            
            // اجرای کوئری
            $stmt = $conn->prepare($query);
            $stmt->execute();
            
            // واکشی نتایج
            $menus = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
            // ارسال پاسخ JSON
            header('Content-Type: application/json');
            if ($menus) {
                echo json_encode([
                    'success' => true,
                    'menus' => $menus
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'No menus found'
                ]);
            }
        } catch (\PDOException $e) {
            // در صورت بروز خطا در اجرای کوئری، خطای سرور را برمی‌گردانیم
            header('Content-Type: application/json', true, 500);
            echo json_encode([
                'success' => false,
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    }


    public function addMenu() {
        // دریافت داده‌های ارسال‌شده از درخواست
        $data = json_decode(file_get_contents("php://input"), true);

        // بررسی وجود داده‌ها
        if (empty($data['title']) || empty($data['url'])) {
            echo json_encode([
                'success' => false,
                'message' => 'عنوان و آدرس منو الزامی است.'
            ]);
            return;
        }

        // ایجاد شیء از کلاس Database
        $db = new Database();
        $conn = $db->conn(); // دریافت اتصال به پایگاه داده

        // نوشتن کوئری برای افزودن منو به پایگاه داده
        $query = "INSERT INTO menus (title, url, order_m, is_active, parent_id, created_at, updated_at) 
                  VALUES (:title, :url, :order_m, :is_active, :parent_id, NOW(), NOW())";
        
        // پارامترهای کوئری
        $params = [
            ':title' => $data['title'],
            ':url' => $data['url'],
            ':order_m' => isset($data['order_m']) ? $data['order_m'] : 0,
            ':is_active' => isset($data['is_active']) ? $data['is_active'] : 1,
            ':parent_id' => isset($data['parent_id']) ? $data['parent_id'] : null
        ];

        // اجرای کوئری
        try {
            $stmt = $conn->prepare($query);
            $stmt->execute($params);
            $newMenuId = $conn->lastInsertId(); // دریافت آخرین شناسه درج‌شده

            // ارسال پاسخ موفق
            echo json_encode([
                'success' => true,
                'message' => 'منو با موفقیت افزوده شد.',
                'menu' => [
                    'id' => $newMenuId,
                    'title' => $data['title'],
                    'url' => $data['url'],
                    'order_m' => $data['order_m'] ?? 0,
                    'is_active' => $data['is_active'] ?? 1,
                    'parent_id' => $data['parent_id'] ?? null,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]
            ]);
        } catch (\PDOException $e) {
            // در صورت بروز خطا
            echo json_encode([
                'success' => false,
                'message' => 'خطا در افزودن منو: ' . $e->getMessage()
            ]);
        }
    }


}
