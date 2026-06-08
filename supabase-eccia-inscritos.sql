create table if not exists public.eccia_inscritos (
  id uuid primary key default gen_random_uuid(),
  nombres text not null check (char_length(trim(nombres)) between 2 and 120),
  apellidos text not null check (char_length(trim(apellidos)) between 2 and 120),
  cedula_dni text not null check (char_length(trim(cedula_dni)) between 5 and 40),
  edad smallint not null check (edad between 12 and 100),
  pais text not null check (char_length(trim(pais)) between 2 and 80),
  ciudad text not null check (char_length(trim(ciudad)) between 2 and 100),
  direccion text not null check (char_length(trim(direccion)) between 5 and 220),
  celular text not null check (char_length(trim(celular)) between 7 and 30),
  correo text not null check (
    char_length(trim(correo)) between 6 and 254
    and correo ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  empleador text null check (empleador is null or char_length(trim(empleador)) between 2 and 160),
  created_at timestamptz not null default now()
);

comment on table public.eccia_inscritos is 'Catálogo de inscritos a cursos ECCIA capturado desde formulario público.';
comment on column public.eccia_inscritos.empleador is 'Campo opcional; puede quedar null cuando el inscrito no declara empleador.';

create unique index if not exists eccia_inscritos_cedula_dni_unique_idx
  on public.eccia_inscritos (lower(trim(cedula_dni)));

create index if not exists eccia_inscritos_created_at_idx
  on public.eccia_inscritos (created_at desc);

alter table public.eccia_inscritos enable row level security;

revoke all on table public.eccia_inscritos from anon, authenticated;
grant insert on table public.eccia_inscritos to anon, authenticated;
grant select, insert, update, delete on table public.eccia_inscritos to service_role;

create policy "Formulario publico puede registrar inscritos ECCIA"
  on public.eccia_inscritos
  for insert
  to anon, authenticated
  with check (
    char_length(trim(nombres)) between 2 and 120
    and char_length(trim(apellidos)) between 2 and 120
    and char_length(trim(cedula_dni)) between 5 and 40
    and edad between 12 and 100
    and char_length(trim(pais)) between 2 and 80
    and char_length(trim(ciudad)) between 2 and 100
    and char_length(trim(direccion)) between 5 and 220
    and char_length(trim(celular)) between 7 and 30
    and char_length(trim(correo)) between 6 and 254
    and correo ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    and (empleador is null or char_length(trim(empleador)) between 2 and 160)
  );
