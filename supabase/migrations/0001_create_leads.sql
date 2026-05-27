-- Tabela de leads do formulário do site (seção "Preencha abaixo").
-- Rode este SQL no Supabase: Dashboard -> SQL Editor -> New query -> cole -> Run.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  nome          text,
  telefone      text,
  email         text,
  empresa       text,
  faturamento   text,        -- ate-30k | 30k-50k | 50k-100k | 100k-300k | 300k+
  tem_site      text,        -- sim-nao-vende | sim-desatualizado | nao
  gargalo       text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Segurança: RLS ligado e SEM políticas públicas.
-- Só a chave secreta (service_role / sb_secret_...), usada no backend, enxerga os dados.
-- A chave pública (anon / publishable) NÃO consegue ler nem gravar.
alter table public.leads enable row level security;
