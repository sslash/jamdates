create table IF NOT EXISTS users (
    id serial primary key,
    name varchar(50),
    email varchar(64) unique not null,
    adress varchar(50),
    bio varchar(500),
    image varchar(100),
    description varchar(200),
    hash varchar(100),
    facebook varchar(60) unique,
    tokens json,
    profile json,
    resetPasswordToken varchar(100),
    resetPasswordExpires date,
    active boolean not null default true,
    created timestamptz not null default now(),
    updated timestamptz not null default now()
);

create table IF NOT EXISTS skill_level (
    instrument_id integer not null,
    user_id integer not null,
    value integer not null,
    unique (instrument_id, user_id)
);

-- A user wants to jam. He has signed up for jamming with the instruments and
-- music styles he wants to play. Set the in-active after he has participated in a jam
create table IF NOT EXISTS user_jam_participation (
    id serial primary key,    
    active boolean default true,
    user_id integer not null,
    created timestamptz not null default now()
);


-- user *-> user_jam_participation (active/false) <-* genres, instruments  
create table IF NOT EXISTS user_jam_participation_genre (
    user_jam_participation_id integer not null,    
    genre_id integer not null
);

create table IF NOT EXISTS user_jam_participation_instrument (
    user_jam_participation_id integer not null,    
    instrument_id integer not null
);

create table IF NOT EXISTS instrument (
    id serial primary key,
    name varchar(50)
);

create table IF NOT EXISTS genre (
    id serial primary key,
    name varchar(50)
);

