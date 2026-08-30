-- wayfinder trip persistence schema
create extension if not exists "pgcrypto";

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  destination text not null,
  title text not null,
  starts_on date not null,
  ends_on date not null,
  budget_tier text not null check (budget_tier in ('budget', 'moderate', 'luxury')),
  travelers integer not null default 1 check (travelers > 0),
  vibes text[] not null default '{}',
  estimated_daily_spend numeric(10, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists itinerary_days (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  day_number integer not null,
  date date not null,
  title text not null,
  area text,
  unique (trip_id, day_number)
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  itinerary_day_id uuid not null references itinerary_days(id) on delete cascade,
  period text not null check (period in ('morning', 'afternoon', 'evening')),
  starts_at time,
  title text not null,
  description text,
  category text,
  transit_note text,
  latitude double precision,
  longitude double precision,
  sort_order integer not null default 0
);

create table if not exists saved_places (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  trip_id uuid references trips(id) on delete cascade,
  name text not null,
  category text,
  latitude double precision,
  longitude double precision,
  booking_url text,
  created_at timestamptz not null default now()
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  user_contact text not null,
  channel text not null check (channel in ('email', 'sms')),
  kind text not null check (kind in ('packing', 'check_in', 'documents')),
  send_at timestamptz not null,
  status text not null default 'queued' check (status in ('queued', 'sent', 'failed')),
  created_at timestamptz not null default now()
);

create index if not exists itinerary_days_trip_idx on itinerary_days(trip_id, day_number);
create index if not exists activities_day_idx on activities(itinerary_day_id, sort_order);
create index if not exists reminders_due_idx on reminders(status, send_at);

alter table trips enable row level security;
alter table saved_places enable row level security;
create policy "Users manage their own trips" on trips for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage their saved places" on saved_places for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
