/** PostgreSQL integration checks. Requires npm install, configured .env, and `npm run db:setup`. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import pg from 'pg'
import { toJalaali, toGregorian } from 'jalaali-js'

test('Persian calendar round-trip around the current period', () => {
  const g = {gy:2026,gm:10,gd:25}
  const j=toJalaali(g.gy,g.gm,g.gd)
  assert.deepEqual(toGregorian(j.jy,j.jm,j.jd),g)
})

test('DB forbids overlapping confirmed appointments but permits adjacent time and cancelled slots', async () => {
  assert.ok(process.env.DATABASE_URL,'DATABASE_URL is required for integration tests')
  const pool=new pg.Pool({connectionString:process.env.DATABASE_URL})
  const client=await pool.connect()
  const code=()=>randomBytes(8).toString('hex').toUpperCase()
  try {
    await client.query('BEGIN')
    const result=await client.query('SELECT id FROM services WHERE is_active=true LIMIT 1')
    assert.ok(result.rows[0],'Seed services first with npm run db:setup')
    const id=result.rows[0].id
    const add=async (start,end,status='confirmed')=>client.query(`INSERT INTO appointments(service_id,patient_name,mobile,start_at,end_at,tracking_code,status)
      VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`,[id,'Test Appointment','09120000000',start,end,code(),status])
    const date='2047-04-08'
    const first=await add(`${date}T10:00:00Z`,`${date}T11:00:00Z`)
    await client.query('SAVEPOINT conflict_test')
    await assert.rejects(add(`${date}T10:30:00Z`,`${date}T11:30:00Z`),(err)=>err?.code==='23P01')
    await client.query('ROLLBACK TO SAVEPOINT conflict_test')
    const adjacent=await add(`${date}T11:00:00Z`,`${date}T11:30:00Z`)
    assert.ok(adjacent.rows[0].id)
    await client.query('UPDATE appointments SET status=$1 WHERE id=$2',['cancelled',first.rows[0].id])
    const reused=await add(`${date}T10:30:00Z`,`${date}T11:00:00Z`)
    assert.ok(reused.rows[0].id)
  } finally {await client.query('ROLLBACK');client.release();await pool.end()}
})
