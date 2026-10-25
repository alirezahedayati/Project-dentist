import pg from 'pg'
import bcrypt from 'bcryptjs'
import { readFileSync } from 'node:fs'
const { Pool } = pg
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
try {
  await pool.query(readFileSync(new URL('../database/schema.sql', import.meta.url), 'utf8'))
  console.log('Database schema and public example services initialized.')
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 12 && process.env.ADMIN_PASSWORD !== 'CHANGE_THIS_TO_A_LONG_UNIQUE_PASSWORD') {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    await pool.query(`INSERT INTO admin_users(email,password_hash) VALUES ($1,$2)
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`, [process.env.ADMIN_EMAIL.trim().toLowerCase(), password])
    console.log('Admin credentials created or updated.')
  } else console.log('WARNING: Set ADMIN_EMAIL and a secure ADMIN_PASSWORD (12+ chars) and re-run setup for admin access.')
} finally { await pool.end() }
