<?php

namespace Controllers;

use Core\Controller;
use Core\Database;
use Core\Request;
use Core\Response;
class GalleryController extends Controller {

    public function deleteGalleryImage(Request $request)
    {
        // دریافت شناسه از بدنه درخواست (داده‌های POST)
        $id = $request->getBody()['id'] ?? null;

        if ($id) {
            // انجام کوئری حذف از دیتابیس
            $conn = new Database();
            $db = $conn->conn(); // دریافت اتصال به پایگاه داده
            $stmt = $db->prepare('DELETE FROM gallery_images WHERE id = :id');
            $stmt->bindParam(':id', $id, \PDO::PARAM_INT);

            if ($stmt->execute()) {
                return Response::json(['message' => 'تصویر گالری با موفقیت حذف شد.']);
            } else {
                return Response::json(['error' => 'حذف تصویر گالری انجام نشد.'], 500);
            }
        }

        return Response::json(['error' => 'شناسه تصویر معتبر نیست.'], 400);
    }

    // دریافت لیست تصاویر گالری
    public function getGalleryImages() {
        // تنظیم هدر برای فرمت JSON
        header('Content-Type: application/json');

        $db = new Database();
        $conn = $db->conn(); // دریافت اتصال به پایگاه داده

        $query = "SELECT id, image_url FROM gallery_images ORDER BY id DESC";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        $images = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if ($images) {
            echo json_encode([
                'success' => true,
                'images' => $images
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No images found'
            ]);
        }
    }

    // افزودن تصویر به گالری
    public function addGalleryImage() {
        header('Content-Type: application/json');

        // دریافت داده‌های ارسالی
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['image_url']) || empty($data['image_url'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Image URL is required'
            ]);
            return;
        }

        $imageUrl = $data['image_url'];

        $db = new Database();
        $conn = $db->conn();

        $query = "INSERT INTO gallery_images (image_url) VALUES (:image_url)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':image_url', $imageUrl);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Image added successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to add image'
            ]);
        }
    }

    // حذف تصویر از گالری
    // public function deleteGalleryImage($id) {
    //     header('Content-Type: application/json');

    //     if (!$id || !is_numeric($id)) {
    //         echo json_encode([
    //             'success' => false,
    //             'message' => 'Invalid image ID'
    //         ]);
    //         return;
    //     }

    //     $db = new Database();
    //     $conn = $db->conn();

    //     $query = "DELETE FROM gallery_images WHERE id = :id";
    //     $stmt = $conn->prepare($query);
    //     $stmt->bindParam(':id', $id);

    //     if ($stmt->execute()) {
    //         echo json_encode([
    //             'success' => true,
    //             'message' => 'Image deleted successfully'
    //         ]);
    //     } else {
    //         echo json_encode([
    //             'success' => false,
    //             'message' => 'Failed to delete image'
    //         ]);
    //     }
    // }
}
