// @vitest-environment node
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Isolated PostgreSQL/WASM installed in a temporary directory; never connects to a provider or Supabase.
type Db = { exec: (sql: string) => Promise<unknown>; query: <T>(sql: string, params?: unknown[]) => Promise<{ rows: T[] }>; close: () => Promise<void> };
let db: Db;
const owner = "11111111-1111-4111-8111-111111111111";
const other = "22222222-2222-4222-8222-222222222222";
let original: string; let revised: string; let attempt: string;
const source = resolve("supabase/migrations/20261005230057_payment_recovery.sql");
describe.skipIf(!process.env.PAYMENT_TEST_PGLITE)("isolated payment PostgreSQL", () => {
  beforeAll(async () => {
    const require = createRequire(import.meta.url);
    const { PGlite } = require(process.env.PAYMENT_TEST_PGLITE!) as { PGlite: new () => Db };
    db = new PGlite();
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create table public.profiles(id uuid primary key);
      create table public.cvs(id uuid primary key default gen_random_uuid(),profile_id uuid references public.profiles,
        cv_data jsonb, foto_url text, template text,status text,created_at timestamptz default now());
      create table public.payments(id uuid default gen_random_uuid(),user_id uuid,cv_id uuid,payment_id text unique,
        amount numeric,status text,payer_email text,payment_type text,payment_method text);
      create table public.payment_checkout_sessions(id uuid primary key default gen_random_uuid(),cv_id uuid references public.cvs,
        profile_id uuid references public.profiles,provider text,idempotency_key uuid default gen_random_uuid(),
        provider_checkout_id text,checkout_url text,status text default 'pending',attribution jsonb default '{}',
        contact_email text,is_guest boolean,created_at timestamptz default now(),updated_at timestamptz default now());
      create unique index active_idx on public.payment_checkout_sessions(cv_id,provider) where status='pending';
      insert into public.profiles values('${owner}'),('${other}');`);
    await db.exec(readFileSync(source, "utf8"));
  }, 30000);
  afterAll(async () => { await db?.close(); });
  const snapshot = async (previous: string | null, text: string, template = "elegance", profile = owner) => {
    const response = await db.query<{ result: { ok: boolean; cv?: { id: string }; status?: number } }>(
      "select public.prepare_payment_cv($1,$2,$3,$4) as result", [profile, previous, JSON.stringify({ sobreMi: text, language: "es" }), template]);
    return response.rows[0].result;
  };
  const reserve = async (id: string, provider = "paypal") => (await db.query<{ result: { id: string; conflict_cv_id?: string } }>(
    "select public.reserve_payment_checkout($1,$2,$3,'{}','test@example.com',true) as result", [id, owner, provider])).rows[0].result;

  it("deduplica doble petición y respuesta perdida antes de obtener un ID", async () => {
    const results = await Promise.all([snapshot(null, "original"), snapshot(null, "original")]);
    original = results[0].cv!.id;
    expect(results[1].cv!.id).toBe(original);
    expect((await snapshot(null, "original")).cv!.id).toBe(original);
  });
  it("reserva un solo intento concurrente y bloquea cambiar de proveedor", async () => {
    const results = await Promise.all([reserve(original), reserve(original)]);
    attempt = results[0].id;
    expect(results[1].id).toBe(attempt);
    expect((await reserve(original, "mercado_pago")).conflict_cv_id).toBe(original);
    await db.query("update public.payment_checkout_sessions set provider_checkout_id='order-original',checkout_url='https://provider/old' where id=$1", [attempt]);
  });
  it("conserva la versión nueva sin reasignar el enlace anterior", async () => {
    revised = (await snapshot(original, "revised", "harvard")).cv!.id;
    expect(revised).not.toBe(original);
    expect((await snapshot(original, "revised", "harvard")).cv!.id).toBe(revised);
    expect((await reserve(revised)).conflict_cv_id).toBe(original);
    await expect(db.query("update public.cvs set template='harvard' where id=$1", [original])).rejects.toThrow(/immutable/);
  });
  it("rechaza una versión de otro propietario", async () => {
    expect(await snapshot(original, "other", "elegance", other)).toMatchObject({ ok: false, status: 404 });
  });
  it("relaciona una edición sin CV ID tras perder la primera respuesta", async () => {
    const key = "33333333-3333-4333-8333-333333333333";
    const call = async (text: string) => (await db.query<{ result: { cv: { id: string } } }>(
      "select public.prepare_payment_cv($1,null,$2,'elegance',$3) as result", [owner, JSON.stringify({ sobreMi: text }), key])).rows[0].result.cv.id;
    const first = await call("lost response original"); await reserve(first);
    const edited = await call("lost response revised");
    expect(edited).not.toBe(first);
    expect((await reserve(edited)).conflict_cv_id).toBe(first);
  });
  it("conserva alias de borradores distintos que recuperaron la misma versión", async () => {
    const call = async (key: string, text: string) => (await db.query<{ result: { cv: { id: string } } }>(
      "select public.prepare_payment_cv($1,null,$2,'elegance',$3) as result", [owner, JSON.stringify({ sobreMi: text }), key])).rows[0].result.cv.id;
    const firstKey = "44444444-4444-4444-8444-444444444444";
    const secondKey = "55555555-5555-4555-8555-555555555555";
    const first = await call(firstKey, "identical draft"); await reserve(first);
    expect(await call(secondKey, "identical draft")).toBe(first);
    const changed = await call(secondKey, "changed after losing response");
    expect((await reserve(changed)).conflict_cv_id).toBe(first);
  });
  it("la confirmación tardía y repetida desbloquea solo el CV y plantilla originales", async () => {
    const pay = () => db.query<{ result: { payment_inserted: boolean } }>(
      "select public.complete_registered_cv_payment($1,'capture-original',2.99,'paypal',null,'paypal') as result", [attempt]);
    const results = await Promise.all([pay(), pay()]);
    expect(results.map((r) => r.rows[0].result.payment_inserted).sort()).toEqual([false, true]);
    const cvs = await db.query<{ id: string; template: string; status: string }>("select id,template,status from public.cvs");
    expect(cvs.rows.find((cv) => cv.id === original)).toMatchObject({ status: "paid", template: "elegance" });
    expect(cvs.rows.find((cv) => cv.id === revised)).toMatchObject({ status: "pending", template: "harvard" });
    expect((await reserve(revised)).conflict_cv_id).toBe(original);
    await db.query("update public.cvs set cv_data='{}' where id=$1", [original]); // Existing paid editing rights.
  });
  it("rechaza importe/proveedor incorrectos y reutilización de un pago ajeno", async () => {
    await expect(db.query("select public.complete_registered_cv_payment($1,'bad',0.01,'paypal',null,'paypal')", [attempt])).rejects.toThrow();
    await expect(db.query("select public.complete_registered_cv_payment($1,'bad',1999,'mercado_pago',null,'mercado_pago')", [attempt])).rejects.toThrow();
    const unrelated = (await snapshot(null, "independent")).cv!.id;
    const next = await reserve(unrelated);
    await db.query("update public.payment_checkout_sessions set provider_checkout_id='another-order' where id=$1", [next.id]);
    await expect(db.query("select public.complete_registered_cv_payment($1,'capture-original',2.99,'paypal',null,'paypal')", [next.id])).rejects.toThrow(/association/);
  });
  it("reemplaza un intento vencido sin borrar orden, CV ni plantilla", async () => {
    const id = (await snapshot(null, "expired purchase")).cv!.id;
    const old = await reserve(id);
    await db.query("update public.payment_checkout_sessions set status='expired',provider_checkout_id='expired-order' where id=$1", [old.id]);
    const next = await reserve(id);
    expect(next.id).not.toBe(old.id);
    expect((await db.query("select id from public.payment_checkout_sessions where cv_id=$1", [id])).rows).toHaveLength(2);
  });
  it("las funciones privilegiadas y la relación de versiones no son públicas", async () => {
    const result = await db.query<{ allowed: boolean }>("select has_function_privilege('authenticated','public.prepare_payment_cv(uuid,uuid,jsonb,text,uuid)','EXECUTE') as allowed");
    expect(result.rows[0].allowed).toBe(false);
  });
});
