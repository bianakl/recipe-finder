-- Recipe Finder: Supabase Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- Consent type enum
create type consent_type as enum ('data_processing', 'marketing');

-- 1. Profiles (extends auth.users)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'premium')),
  stripe_customer_id text,
  subscription_status text default 'none' check (subscription_status in ('none', 'active', 'past_due', 'canceled', 'trialing')),
  subscription_period_end timestamptz,
  data_processing_consent boolean default false,
  marketing_consent boolean default false,
  consent_updated_at timestamptz default now(),
  deletion_requested_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Consent Records (immutable audit log)
create table consent_records (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  consent_type consent_type not null,
  granted boolean not null,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

-- 3. Saved Recipes
create table saved_recipes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id text not null,
  recipe_name text,
  recipe_thumb text,
  recipe_category text,
  recipe_area text,
  recipe_tags text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, recipe_id)
);

-- 4. Meal Plans
create table meal_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  day text not null check (day in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  meal text not null check (meal in ('breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner')),
  recipe_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, day, meal)
);

-- 5. Cooking History
create table cooking_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id text not null,
  cooked_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 6. Recipe Notes
create table recipe_notes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id text not null,
  note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, recipe_id)
);

-- 7. Recipe Ratings
create table recipe_ratings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, recipe_id)
);

-- 8. Shopping List
create table shopping_list (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  quantity text,
  measures jsonb default '[]',
  category text,
  checked boolean default false,
  recipes jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. Pantry
create table pantry (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  ingredient text not null,
  created_at timestamptz default now(),
  unique(user_id, ingredient)
);

-- 10. User Settings
create table user_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade unique not null,
  measurement_system text default 'imperial' check (measurement_system in ('imperial', 'metric')),
  temperature_unit text default 'fahrenheit' check (temperature_unit in ('fahrenheit', 'celsius')),
  default_servings integer default 4 check (default_servings >= 1 and default_servings <= 20),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

alter table profiles enable row level security;
alter table consent_records enable row level security;
alter table saved_recipes enable row level security;
alter table meal_plans enable row level security;
alter table cooking_history enable row level security;
alter table recipe_notes enable row level security;
alter table recipe_ratings enable row level security;
alter table shopping_list enable row level security;
alter table pantry enable row level security;
alter table user_settings enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Consent records: users can view their own, insert their own
create policy "Users can view own consent records" on consent_records for select using (auth.uid() = user_id);
create policy "Users can insert own consent records" on consent_records for insert with check (auth.uid() = user_id);

-- All user data tables: full CRUD on own rows
create policy "Users can CRUD own saved recipes" on saved_recipes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own meal plans" on meal_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own cooking history" on cooking_history for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own recipe notes" on recipe_notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own recipe ratings" on recipe_ratings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own shopping list" on shopping_list for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own pantry" on pantry for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can CRUD own settings" on user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================
-- Triggers
-- ==========================================

-- Auto-create profile + settings on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  insert into user_settings (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Auto-update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles for each row execute procedure update_updated_at();
create trigger update_saved_recipes_updated_at before update on saved_recipes for each row execute procedure update_updated_at();
create trigger update_meal_plans_updated_at before update on meal_plans for each row execute procedure update_updated_at();
create trigger update_recipe_notes_updated_at before update on recipe_notes for each row execute procedure update_updated_at();
create trigger update_recipe_ratings_updated_at before update on recipe_ratings for each row execute procedure update_updated_at();
create trigger update_shopping_list_updated_at before update on shopping_list for each row execute procedure update_updated_at();
create trigger update_user_settings_updated_at before update on user_settings for each row execute procedure update_updated_at();
