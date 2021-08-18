CREATE TABLE birds (
  name varchar(255),
  length decimal(3,1),
  wingspan decimal(3,1),
  family varchar(255),
  extinct boolean
);

INSERT INTO birds
VALUES ('Spotted Towhee', 21.6, 26.7, 'Emberizidae', false),
       ('American Robin', 25.5, 36.0, 'Turdidae', false),
       ('Greater Koa Finch', 19, 24, 'Fringillidae', true),
       ('Carolina Parakeet', 33, 55.8, 'Psittacidae', true),
       ('Common Kestrel', 35.5, 73.5, 'Falconidae', false);



SELECT name, family FROM birds
WHERE extinct = false
ORDER BY length DESC;

SELECT round(avg(wingspan), 2) AS "Average Wingspan", min(wingspan), max(wingspan) FROM birds;

CREATE TABLE menu_items (
  item text,
  prep_time integer,
  ingredient_cost decimal(4,2),
  sales integer,
  menu_price decimal(4,2)
);

INSERT INTO menu_items (item, prep_time, ingredient_cost, sales, menu_price)
VALUES ('omelette', 10, 1.5, 182, 7.99),
       ('tacos', 5, 2, 254, 8.99),
       ('oatmeal', 1, 0.5, 79, 5.99);

SELECT item,
       round((prep_time * 13.0 / 60),2) AS prep_cost,
       ingredient_cost, round((menu_price - ingredient_cost - (prep_time * 13.0 / 60)),2) AS Profit 
FROM menu_items
ORDER BY Profit DESC;


SELECT * FROM films
WHERE length(title) < 12;


ALTER TABLE films
  ADD COLUMN director text,
  ADD COLUMN duration integer;

UPDATE films
SET director = 'John McTiernan', duration = 132
WHERE title = 'Die Hard';

UPDATE films
SET director = 'Michael Curtiz', duration = 102
WHERE title = 'Casablanca';

UPDATE films
SET director = 'Francis Ford Coppola', duration = 113
WHERE title = 'The Conversation';

INSERT INTO films (title, year, genre, director, duration)
VALUES ('1984', 1956, 'scifi', 'Michael Anderson', 90),
       ('Tinker Tailor Soldier Spy', 2011, 'espionage', 'Tomas Alfredson', 127),
       ('The Birdcage', 1996, 'comedy', 'Mike Nichols', 118);

SELECT title, (date_part('year', current_date) - year) AS age FROM films
ORDER BY age ASC;

SELECT title, duration FROM films
WHERE duration > 2 * 60
ORDER BY duration DESC;

SELECT title FROM films
ORDER BY duration DESC
LIMIT 1;



SELECT state, count(id) FROM people
GROUP BY state
ORDER BY count DESC
LIMIT 10;

SELECT substring(substring(email from '@.+') from '[^@].+') AS domain,
       count(id)
FROM people
GROUP BY domain
ORDER BY count DESC;


SELECT id, given_name FROM people
WHERE id =  3399;

DELETE FROM people
WHERE id = 3399 AND given_name = 'Daniel';

SELECT id, given_name, state FROM people
WHERE state = 'CA'
LIMIT 10;

DELETE FROM people
WHERE state = 'CA';

SELECT upper(given_name), email FROM people
WHERE email ~ '.*@teleworm.us';

UPDATE people
SET given_name = upper(given_name)
WHERE email ~ '.*@teleworm.us';

SELECT given_name, email FROM people
WHERE email ~ '.*@teleworm.us';


ALTER TABLE employees
ALTER COLUMN Department
SET DEFAULT 'unassigned';

SELECT * FROM employees
WHERE department IS NULL;

UPDATE employees
SET department = 'unassigned'
WHERE department IS NULL;

ALTER TABLE employees
ALTER COLUMN department
SET NOT NULL;

CREATE TABLE temperatures (
  "date" date NOT NULL,
  low integer NOT NULL,
  high integer NOT NULL
);

INSERT INTO temperatures (date, low, high)
VALUES ('2016-03-01',34,43),
       ('2016-03-02',32,44);


SELECT date, low, high, round((low + high) / 2.0,1) AS average FROM temperatures
WHERE date BETWEEN '03-02-2016' AND '03-08-2016';

AlTER TABLE temperatures
ADD COLUMN rainfall integer NOT NULL DEFAULT 0;

UPDATE temperatures
SET rainfall = (high + low) / 2 - 35
WHERE (high + low) / 2.0 > 35;

UPDATE temperatures
SET rainfall = rainfall / 25.4;

ALTER TABLE temperatures 
ALTER COLUMN rainfall 
TYPE numeric (6,3);

ALTER TABLE temperatures 
RENAME TO weather;



ALTER TABLE films
ALTER COLUMN year SET NOT NULL,
ALTER COLUMN  genre SET NOT NULL,
ALTER COLUMN director SET NOT NULL,
ALTER COLUMN duration SET NOT NULL;


ALTER TABLE films
ADD CONSTRAINT title_unique UNIQUE (title);

ALTER TABLE films
DROP CONSTRAINT title_unique;


ALTER TABLE films
ADD CONSTRAINT title_min_length CHECK (length(title) >= 1);

INSERT INTO films
VALUES ('',1,'a','b',2);

ALTER TABLE films
DROP CONSTRAINT title_min_length;

ALTER TABLE films
ADD CONSTRAINT year_range CHECK (year BETWEEN 1900 AND 2100);

ALTER TABLE films
ADD CONSTRAINT director CHECK (length(director) >= 3 AND director ~ '.*\s.*');

UPDATE films
SET director = 'Johnny'
WHERE title = 'Die Hard';

INSERT INTO films (title, year, genre, director, duration)
VALUES ('Godzilla', 1998, 'scifi', 'Roland Emmerich', 139),
       ('Godzilla', 2014, 'scifi', 'Gareth Edwards', 123);


CREATE SEQUENCE counter;
SELECT nextval('counter');
DROP SEQUENCE counter;


CREATE SEQUENCE even 
INCREMENT BY 2
MINVALUE 0
START WITH 0;

ALTER TABLE films
ADD COLUMN id serial PRIMARY KEY;

ALTER TABLE films ADD COLUMN another_id serial PRIMARY KEY;

ALTER TABLE films
DROP CONSTRAINT films_pkey;











INSERT INTO films (title, year, genre, director, duration)
VALUES ('Wayne''s World', 1992, 'comedy', 'Penelope Spheeris', 95),
       ('Bourne Identity', 2002, 'espionage', 'Doug Liman', 118);


SELECT DISTINCT genre FROM films;


SELECT genre FROM films
GROUP BY genre;


SELECT round(avg(duration),0) FROM films;

SELECT genre, round(avg(duration),0) AS average_duration FROM films
GROUP BY genre;


SELECT year / 10 * 10 AS decade,
       round(avg(duration), 0) AS average_duration FROM films
GROUP BY decade;

SELECT title FROM films WHERE director ~ '^John .*';

SELECT genre, count(id) FROM films
GROUP BY genre
ORDER BY count DESC;


SELECT year / 10 * 10 AS decade, genre,
       string_agg(title, ', ') AS films FROM films
GROUP BY decade, genre
ORDER BY decade, genre;

SELECT genre, sum(duration) as total_duration FROM films
GROUP BY genre;