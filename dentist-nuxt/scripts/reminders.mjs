/** Run hourly using cron/systemd: npm run reminders. This script is idempotent across concurrent runs. */
import pg from 'pg'
if (!process.env.DATABASE_URL) throw Error('DATABASE_URL missing')
if (!process.env.SMS_API_URL || !process.env.SMS_API_KEY) {console.log('SMS gateway not configured, reminders skipped.');process.exit(0)}
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL})
let success=0
try {
  // Send one reminder inside the 24h window; mark only if the provider reports success.
  // SKIP LOCKED ensures concurrent reminder workers do not send the same reminder.
  for(let i=0;i<300;i++) {
    const client=await pool.connect()
    let found=false
    try {
      await client.query('BEGIN')
      const r=await client.query(`SELECT a.id,a.mobile,a.tracking_code,a.start_at,s.name AS service,c.timezone AS timezone
        FROM appointments a JOIN services s ON s.id=a.service_id CROSS JOIN clinic_settings c
        WHERE a.status='confirmed' AND a.reminder_sent_at IS NULL
          AND a.start_at BETWEEN now()+interval '2 hours' AND now()+interval '24 hours'
        ORDER BY a.start_at LIMIT 1 FOR UPDATE OF a SKIP LOCKED`)
      if (!r.rows.length) {await client.query('COMMIT');break}
      found=true
      const a=r.rows[0]
      const time=new Intl.DateTimeFormat('fa-IR',{timeZone:a.timezone,dateStyle:'short',timeStyle:'short'}).format(new Date(a.start_at))
      let sent=false
      try {const response=await fetch(process.env.SMS_API_URL,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.SMS_API_KEY}`},body:JSON.stringify({to:a.mobile,message:`یادآوری نوبت دکتر آزاده مهرداد: ${a.service}، ${time}، کد ${a.tracking_code}`,sender:process.env.SMS_SENDER||''}),signal:AbortSignal.timeout(8000)});sent=response.ok}
      catch(error){console.error('Reminder gateway error:',error.message)}
      if(sent){await client.query('UPDATE appointments SET reminder_sent_at=NOW() WHERE id=$1',[a.id]);success++}
      await client.query('COMMIT')
      if(!sent) break
    } catch(err) {await client.query('ROLLBACK');throw err} finally {client.release()}
    if(!found) break
  }
  console.log('Reminders sent:',success)
} finally {await pool.end()}
