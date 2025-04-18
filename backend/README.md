# بکند

این پروژه یک بکند ساده برای ایجاد یک REST API با زبان PHP است که به صورت کامل از صفر و بدون استفاده از کتابخانه‌ها یا ابزارهای خارجی پیاده‌سازی شده است. این فریم‌ورک شامل ویژگی‌هایی همچون مدیریت مسیرها (Routing)، کنترلرها (Controllers)، مدیریت درخواست‌ها و پاسخ‌ها (Request و Response Handling)، مدیریت خطاها (Error Handling)، و اعتبارسنجی داده‌ها (Data Validation) می‌باشد.

## ویژگی‌ها

- **مدیریت مسیرها (Routing):** پشتیبانی از متدهای HTTP مختلف مانند GET، POST، PUT، DELETE.
- **کنترلرها (Controllers):** ساختار برای مدیریت و سازماندهی منطق برنامه.
- **مدیریت درخواست‌ها (Request Handling):** تجزیه و تحلیل درخواست‌های ورودی و فراهم کردن داده‌های درخواست به صورت آسان.
- **مدیریت پاسخ‌ها (Response Handling):** ارسال پاسخ‌های HTTP با کدهای وضعیت مختلف، هدرها و محتوای بدنه.
- **مدیریت خطاها (Error Handling):** مکانیزم برای مدیریت خطاها و استثنائات.
- **اعتبارسنجی داده‌ها (Data Validation):** پشتیبانی از انواع اعتبارسنجی‌های مختلف از جمله رشته‌ها، اعداد، موبایل و غیره.
- **پشتیبانی از CORS:** برای ارتباط بین دامنه‌ای با کلاینت‌های مختلف.

## پیش‌نیازها

- PHP
- وب سرور (مانند Apache یا Nginx)
- پایگاه داده MySQL
(پیشنهاد: استفاده از نرم افزار xampp برای فراهم کردن موارد بالا)

## نصب و راه‌اندازی

### 1. تنظیمات پایگاه داده

یک پایگاه داده جدید در MySQL ایجاد کنید و فایل `core/Database.php` را با تنظیمات مناسب برای اتصال به پایگاه داده به‌روزرسانی کنید:

```php
<?php
class Database {
    // ...
    private function __construct() {
        $host = 'localhost';
        $db = 'dentist';
        $user = 'hamraa';
        $pass = '3-MFv[8K@vjQCBvP';
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    }
    // ...
?>
```

### 3. اجرای مهاجرت پایگاه داده

جداول مورد نیاز برای پروژه را در پایگاه داده خود ایجاد کنید:

```sql
CREATE TABLE `appointments` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `type` enum('checkup','cosmetic') NOT NULL DEFAULT 'checkup',
  `reserved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reserved_for` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `refresh_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

برای این کار میتوانید در phpmyadmin یک دیتابیس بسازید و فایل `dentist.sql` را در آن ایمپورت کنید.

### 4. اجرای سرور محلی

برای اجرای سرور محلی از دستور زیر استفاده کنید:

```bash
php -S localhost:8000 -t public
```

### 5. تست API

کالکشن پستمن (`Dentist.postman_collection.json`) را میتوانید در نرم افزار پستمن ایمپورت کنید و ای پی آی را تست نمایید. 

## ساختار پروژه

```
backend/
│
├── core/                   # هسته اصلی
│   ├── App.php             # کلاس اپ
│   ├── Controller.php      # کلاس پایه برای کنترلرها
│   ├── Database.php        # مدیریت اتصال به پایگاه داده
│   ├── ErrorHandler.php    # مدیریت کلی خطاها
│   ├── JwtHandler.php      # مدیریت توکن ها
│   ├── Request.php         # مدیریت درخواست‌ها
│   ├── Response.php        # مدیریت پاسخ‌ها
│   ├── Router.php          # مدیریت مسیرها
│   └── Validator.php       # اعتبارسنجی داده‌ها
│
├── controllers/                   # کنترلرها
│   ├── AppointmentController.php  # کنترلر مدیریت نوبت ها
│   ├── HomeController.php         # کنترلر مدیریت خانه
│   └── UserController.php         # کنترلر مدیریت کاربران
│
├── public/                 # پوشه عمومی (برای دسترسی وب)
│   └── index.php           # نقطه ورود اصلی
│
└── README.md               # فایل راهنما
```