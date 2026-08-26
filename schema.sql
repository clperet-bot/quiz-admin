-- ============================================================
-- Quiz Admin — schéma de base de données
-- À exécuter dans Supabase : SQL Editor > New query > coller > Run
-- ============================================================

create extension if not exists pgcrypto;

-- Une ligne par classe (2nde TNE, 2nde MES, 1ère MES, 1ère MELEC...)
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,          -- utilisé dans l'URL élève, ex: "2ndeTNE"
  created_at timestamptz not null default now()
);

-- Un quiz appartient à une classe. "active" = affiché ou non côté élève.
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes(id) on delete cascade,
  title text not null,
  url text not null,                  -- lien vers la page du quiz (GitHub Pages)
  total_questions int not null default 0,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

-- Une ligne par tentative d'élève (jamais écrasée : historique complet)
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  student_name_raw text not null,           -- ce que l'élève a tapé
  student_name_normalized text not null,    -- sans accents, minuscules, sans espaces superflus
  score int,
  total int,
  cancelled boolean not null default false, -- true = sortie d'écran détectée, tentative annulée
  created_at timestamptz not null default now()
);

create index if not exists idx_attempts_lookup
  on attempts (class_id, quiz_id, student_name_normalized);

-- ============================================================
-- Sécurité (Row Level Security)
-- ============================================================
alter table classes enable row level security;
alter table quizzes enable row level security;
alter table attempts enable row level security;

-- Élèves (visiteurs anonymes) :
-- - peuvent voir toutes les classes (pour résoudre le slug de l'URL)
-- - peuvent voir uniquement les quiz actifs
-- - peuvent enregistrer une tentative et lire les tentatives (pour la règle "1x/jour")
create policy "public read classes" on classes
  for select using (true);

create policy "public read active quizzes" on quizzes
  for select using (active = true);

create policy "public insert attempts" on attempts
  for insert with check (true);

create policy "public read attempts" on attempts
  for select using (true);

-- Toi (connectée via Supabase Auth) : accès complet à tout
create policy "teacher full classes" on classes
  for all using (auth.role() = 'authenticated');

create policy "teacher full quizzes" on quizzes
  for all using (auth.role() = 'authenticated');

create policy "teacher full attempts" on attempts
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- Données de départ — adapte les noms/slugs à tes vraies classes
-- ============================================================
insert into classes (name, slug) values
  ('2nde TNE', '2ndeTNE'),
  ('2nde MES', '2ndeMES'),
  ('1ère MES', '1ereMES'),
  ('1ère MELEC', '1ereMELEC')
on conflict (slug) do nothing;
