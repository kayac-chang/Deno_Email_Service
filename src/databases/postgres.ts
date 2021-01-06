import { Pool, QueryConfig, curry } from "../def.ts";

let pool: Pool | undefined = undefined;

function init() {
  pool ??=
    new Pool(
      {
        user: Deno.env.get("PG_USER"),
        database: Deno.env.get("PG_DATABASE"),
        password: Deno.env.get("PG_PASSWORD"),
        hostname: Deno.env.get("PG_HOST"),
        port: Number(Deno.env.get("PG_PORT") || 5432),
      },
      Number(Deno.env.get("PG_CONNECTIONS") || 20)
    );

  return pool;
}

export async function query(sql: string | QueryConfig) {
  const pool = init();

  const client = await pool.connect();

  const result = await client.query(sql);

  queueMicrotask(() => client.release());

  return result;
}

export const insert = curry(<T>(table: string, data: T) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return query({
    text: `
        INSERT INTO ${table} 
          ( ${keys.join()} ) 
        VALUES
          ( ${keys.map((_, idx) => `$${idx + 1}`).join()} )
        RETURNING
          *
        ;
      `,
    args: values,
  });
});

export default { query, insert };
