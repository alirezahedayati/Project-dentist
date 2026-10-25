BEGIN;
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS login_attempts (
  id BIGSERIAL PRIMARY KEY, ip TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip,created_at);
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash TEXT PRIMARY KEY,
  admin_id BIGINT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expiry ON admin_sessions(expires_at);
CREATE TABLE IF NOT EXISTS clinic_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK(id = 1),
  doctor_name TEXT NOT NULL DEFAULT 'دکتر آزاده مهرداد',
  tagline TEXT NOT NULL DEFAULT 'لبخند زیبا، آغاز اعتمادبه‌نفس شما',
  intro TEXT NOT NULL DEFAULT 'با بهره‌گیری از روش‌های نوین دندانپزشکی، در کنار شما هستیم تا تجربه‌ای آرام، مطمئن و رضایت‌بخش از مراقبت‌های دهان و دندان داشته باشید.',
  biography TEXT NOT NULL DEFAULT '',
  education TEXT NOT NULL DEFAULT '',
  certificates TEXT NOT NULL DEFAULT '',
  doctor_photo TEXT NOT NULL DEFAULT '',
  hero_photo TEXT NOT NULL DEFAULT '/images/smile-hero.webp',
  phone TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', map_url TEXT NOT NULL DEFAULT '',
  instagram_url TEXT NOT NULL DEFAULT '',
  timezone TEXT NOT NULL DEFAULT 'Asia/Tehran',
  cancellation_hours INTEGER NOT NULL DEFAULT 12 CHECK (cancellation_hours BETWEEN 0 AND 168),
  booking_horizon_days INTEGER NOT NULL DEFAULT 60 CHECK (booking_horizon_days BETWEEN 7 AND 365),
  slot_step_minutes INTEGER NOT NULL DEFAULT 15 CHECK (slot_step_minutes IN (5,10,15,20,30,60)),
  working_hours JSONB NOT NULL DEFAULT '{"0":[["09:00","17:00"]],"1":[["09:00","17:00"]],"2":[["09:00","17:00"]],"3":[["09:00","17:00"]],"4":[["09:00","13:00"]],"5":[],"6":[["09:00","17:00"]]}'::jsonb,
  deposit_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Weekdays above are JS UTC weekday numbers: 0=Sunday, ..., 6=Saturday.
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', icon TEXT NOT NULL DEFAULT 'sparkles',
  duration_minutes INTEGER NOT NULL DEFAULT 30 CHECK(duration_minutes BETWEEN 15 AND 240),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS holidays (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  reason TEXT NOT NULL DEFAULT 'تعطیلی مطب'
);
CREATE TABLE IF NOT EXISTS appointments (
  id BIGSERIAL PRIMARY KEY,
  service_id BIGINT NOT NULL REFERENCES services(id),
  patient_name TEXT NOT NULL, mobile TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '',
  start_at TIMESTAMPTZ NOT NULL, end_at TIMESTAMPTZ NOT NULL,
  tracking_code VARCHAR(20) NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK(status IN ('confirmed','cancelled','completed','no_show')),
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK(end_at > start_at)
);
-- True database-level overlap guard: concurrent submissions cannot book overlapping durations.
-- Cancelled appointments release their time windows.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'appointment_no_overlap') THEN
    ALTER TABLE appointments ADD CONSTRAINT appointment_no_overlap
      EXCLUDE USING gist (tstzrange(start_at, end_at, '[)') WITH &&)
      WHERE (status IN ('confirmed','completed','no_show'));
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_appointments_start ON appointments(start_at);
CREATE INDEX IF NOT EXISTS idx_appointments_mobile_code ON appointments(mobile, tracking_code);
INSERT INTO clinic_settings(id) VALUES(1) ON CONFLICT DO NOTHING;
INSERT INTO services(name,description,icon,duration_minutes,sort_order)
SELECT s.name,s.description,s.icon,s.duration_minutes,s.sort_order FROM (VALUES
 ('معاینه و مشاوره','بررسی دقیق سلامت دهان و دندان و ارائه برنامه درمانی متناسب','stethoscope',30,1),
 ('جرم‌گیری و بروساژ','پاک‌سازی تخصصی جرم و پلاک برای حفظ سلامت لثه و طراوت لبخند','sparkles',45,2),
 ('ترمیم و پرکردن دندان','ترمیم دندان‌های آسیب‌دیده با مواد استاندارد و حفظ ساختار دندان','shield-check',60,3),
 ('درمان ریشه (عصب‌کشی)','درمان تخصصی کانال ریشه برای حفظ دندان طبیعی','activity',90,4),
 ('سفیدکردن دندان (بلیچینگ)','کمک به روشن‌ترشدن رنگ دندان‌ها پس از ارزیابی شرایط دهان','sun',60,5),
 ('کامپوزیت ونیر','اصلاح فرم و زیبایی لبخند با مواد همرنگ دندان','gem',90,6),
 ('لمینت سرامیکی','بررسی و طراحی طرح درمان زیبایی با روکش‌های نازک سرامیکی','smile',60,7),
 ('خدمات زیبایی و ترمیمی','مشاوره برای انتخاب روش مناسب زیبایی و بازسازی لبخند','heart-handshake',45,8)
) AS s(name,description,icon,duration_minutes,sort_order)
WHERE NOT EXISTS (SELECT 1 FROM services);
COMMIT;
