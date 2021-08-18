CREATE DATABASE workshop;
\c workshop

CREATE TABLE devices(
  id serial PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE parts(
  id serial PRIMARY KEY,
  part_number integer UNIQUE NOT NULL,
  device_id integer NOT NULL REFERENCES devices(id)
);