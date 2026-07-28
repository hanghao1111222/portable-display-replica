create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  platform text not null,
  order_number text,
  product_model text not null,
  laptop_make text,
  laptop_model text,
  laptop_year text,
  message text not null,
  source_page text not null default '/contact',
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

revoke all on table public.contact_submissions from anon, authenticated;
grant select, insert, update, delete on table public.contact_submissions to service_role;

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

comment on table public.contact_submissions is
  'Customer support requests submitted through the Anyking contact page. Writes are performed server-side with the service role.';
