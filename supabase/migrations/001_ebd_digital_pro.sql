-- EBD Digital PRO — estrutura inicial do piloto 2027
-- Executar por migração/CLI no projeto Supabase.

create extension if not exists pgcrypto;

create type public.user_role as enum ('platform_admin','church_admin','pastor','teacher','student');
create type public.license_status as enum ('pilot','active','suspended','expired');
create type public.resource_type as enum ('teacher_guide','presentation_pdf','audio_lesson','sermon_outline_expository','sermon_outline_thematic');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  postal_code text,
  city text,
  country text,
  pastor_name text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status public.license_status not null default 'pilot',
  starts_at timestamptz,
  ends_at timestamptz,
  max_users integer not null default 200 check (max_users > 0),
  notes text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  full_name text not null,
  role public.user_role not null default 'student',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.magazines (
  id uuid primary key default gen_random_uuid(),
  number integer not null unique,
  title text not null,
  subtitle text,
  description text,
  cover_path text,
  public_index_path text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  magazine_id uuid not null references public.magazines(id) on delete cascade,
  number integer not null check (number between 1 and 99),
  title text not null,
  subtitle text,
  base_verse text,
  public_path text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (magazine_id, number)
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  type public.resource_type not null,
  title text not null,
  description text,
  storage_path text,
  mime_type text,
  duration_seconds integer,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (lesson_id, type)
);

create index profiles_organization_id_idx on public.profiles(organization_id);
create index licenses_organization_id_idx on public.licenses(organization_id);
create index lessons_magazine_id_idx on public.lessons(magazine_id);
create index resources_lesson_id_idx on public.resources(lesson_id);

-- Trigger: novo usuário Auth recebe um perfil básico.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS: tudo protegido por padrão. As políticas serão refinadas conforme
-- o fluxo de administração for implementado.
alter table public.organizations enable row level security;
alter table public.licenses enable row level security;
alter table public.profiles enable row level security;
alter table public.magazines enable row level security;
alter table public.lessons enable row level security;
alter table public.resources enable row level security;

-- Perfil: o usuário pode consultar apenas o próprio perfil.
create policy "profile_self_select"
on public.profiles for select
to authenticated
using (id = auth.uid());

-- Conteúdo estrutural público: somente registros ativos podem ser lidos.
create policy "active_magazines_public_select"
on public.magazines for select
to anon, authenticated
using (active = true);

create policy "active_lessons_public_select"
on public.lessons for select
to anon, authenticated
using (active = true);

-- Recursos são protegidos: o acesso será liberado posteriormente por função,
-- papel e licença. Não existe policy pública para resources nesta fase.
