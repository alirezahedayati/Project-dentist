import pg, { type Pool as PgPool, type PoolClient } from 'pg'
const { Pool } = pg
let pool: PgPool | undefined
export function database() {
  if (!pool) {
    const url = useRuntimeConfig().databaseUrl || process.env.DATABASE_URL
    if (!url) throw createError({ statusCode: 503, message: 'پایگاه داده پیکربندی نشده است.' })
    pool = new Pool({ connectionString: url, max: 12, connectionTimeoutMillis: 7000, idleTimeoutMillis: 30000 })
  }
  return pool
}
export async function query<T extends Record<string, any> = Record<string, any>>(sql: string, params: unknown[] = []) {
  return database().query<T>(sql, params)
}
export async function transaction<T>(fn: (client: PoolClient) => Promise<T>) {
  const client = await database().connect()
  try { await client.query('BEGIN'); const result = await fn(client); await client.query('COMMIT'); return result }
  catch (e) { await client.query('ROLLBACK'); throw e }
  finally { client.release() }
}
