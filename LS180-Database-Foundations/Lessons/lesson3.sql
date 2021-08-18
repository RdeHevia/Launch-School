SELECT count(id) FROM tickets;

SELECT count(DISTINCT customer_id) FROM tickets;


SELECT round(count(DISTINCT tickets.customer_id) / count(DISTINCT customers.id)::decimal * 100.0, 2)
  AS percentage
FROM customers
LEFT OUTER JOIN tickets ON customers.id = tickets.customer_id;


SELECT events.name, count(tickets.event_id) AS popularity FROM events
LEFT OUTER JOIN tickets
  ON events.id = tickets.event_id
GROUP BY events.name
ORDER BY popularity DESC;

SELECT c.id, c.email, count(DISTINCT t.event_id) FROM tickets AS t
INNER JOIN customers AS c
  ON c.id = t.customer_id
GROUP BY c.id
HAVING count(DISTINCT t.event_id) = 3
ORDER BY c.id ASC;


-- events: event (name), starts_at
-- sections: section (name)
-- seats: row, seat (number)

SELECT events.name AS event, events.starts_at, 
       sections.name AS section,
       seats.row AS row, seats.number AS seat
       FROM tickets
       INNER JOIN customers ON customers.id = tickets.customer_id
       INNER JOIN seats ON tickets.seat_id = seats.id
       INNER JOIN sections ON seats.section_id = sections.id
       INNER JOIN events ON tickets.event_id = events.id
WHERE customers.email = 'gennaro.rath@mcdermott.co';



ALTER TABLE orders
ADD CONSTRAINT orders_products_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);


INSERT INTO products (name)
VALUES ('small bolt'),
       ('large bolt');

INSERT INTO orders (product_id, quantity)
VALUES (1, 10),
       (1, 25),
       (2, 15);

-- orders: quantity
-- products: name

SELECT orders.quantity, products.name FROM orders
INNER JOIN products ON orders.product_id = products.id;

ALTER TABLE orders
ALTER COLUMN product_id SET NOT NULL;

DELETE FROM orders
WHERE id = 7;

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  body text NOT NULL,
  product_id integer REFERENCES products (id)
);

INSERT INTO reviews (body, product_id)
VALUES ('a little small', 1),
       ('very round!', 1),
       ('could have been smaller', 2);


INSERT INTO calls ("when", duration, contact_id)
VALUES ('2016-01-18 14:47:00', 632, 6);


SELECT calls.when, calls.duration, contacts.first_name
FROM calls INNER JOIN contacts ON calls.contact_id = contacts.id
WHERE contacts.first_name || ' ' || contacts.last_name != 'William Swift';

INSERT INTO contacts (first_name, last_name, "number")
VALUES ('Merve', 'Elk', 6343511126),
       ('Sawa', 'Fyodorov', 6125594874);

INSERT INTO calls ("when", duration, contact_id)
VALUES ('2016-01-17 11:52:00', 175, 26),
       ('2016-01-18 21:22:00', 79, 27);

ALTER TABLE contacts
ADD CONSTRAINT number_unique UNIQUE (number);




CREATE TABLE my_table1 (
  id serial PRIMARY KEY,
  column1 text NOT NULL
);

CREATE TABLE my_table2 (
  id serial PRIMARY KEY,
  columnA decimal(5,2),
  id_table_1 integer REFERENCES my_table1(id)
);

CREATE TABLE directors (
  id serial PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO directors (name)
VALUES ('John McTiernan'),
       ('Michael Curtiz'),
       ('Francis Ford Coppola'),
       ('Michael Anderson'),
       ('Tomas Alfredson'),
       ('Mike Nichols');

ALTER TABLE films
ADD COLUMN director_id integer REFERENCES directors (id);

UPDATE films SET director_id = 1 WHERE director = 'John McTiernan';
UPDATE films SET director_id = 2 WHERE director = 'Michael Curtiz';
UPDATE films SET director_id = 3 WHERE director = 'Francis Ford Coppola';
UPDATE films SET director_id=4 WHERE director = 'Michael Anderson';
UPDATE films SET director_id=5 WHERE director = 'Tomas Alfredson';
UPDATE films SET director_id=6 WHERE director = 'Mike Nichols';

ALTER TABLE films
ALTER COLUMN director_id SET NOT NULL;

ALTER TABLE films
DROP COLUMN director;

ALTER TABLE directors
ADD CONSTRAINT valid_name
  CHECK (length(name) >= 1 AND position(' ' in name) > 0);

SELECT films.title, films.year, directors.name AS director, films.duration
FROM films INNER JOIN directors ON directors.id = films.director_id;


SELECT books.id, books.author, string_agg(categories.name, ', ') AS categories
FROM books
  INNER JOIN books_categories ON books.id = books_categories.book_id
  INNER JOIN categories ON books_categories.category_id = categories.id
GROUP BY books.id
ORDER BY books.id ASC;


ALTER TABLE books
ALTER COLUMN author TYPE varchar(100),
ALTER COLUMN title TYPE varchar(100);


INSERT INTO books (author, title)
VALUES ('Lynn Sherr', 'Sally Ride: America''s First Woman in Space'),
       ('Charlotte Brontë','Jane Eyre'),
       ('Meeru Dhalwala and Vikram Vij','Vij''s: Elegant and Inspired Indian Cuisine');


INSERT INTO categories (name)
VALUES ('Space Exploration'),
       ('Cookbook'),
       ('South Asia');

INSERT INTO books_categories (book_id, category_id)
VALUES (4,5),
       (4,1),
       (4,7),
       (5,2),
       (5,4),
       (6,8),
       (6,1),
       (6,9);

ALTER TABLE books_categories
ADD UNIQUE (book_id, category_id);

INSERT INTO categories (name)
VALUES ('test');

SELECT categories.name,
       count(books.id) AS book_count,
       string_agg(books.title, ', ') AS book_titles
FROM categories
LEFT OUTER JOIN books_categories ON categories.id = books_categories.category_id
LEFT OUTER JOIN books ON books_categories.book_id = books.id
GROUP BY categories.name
ORDER BY categories.name ASC;



CREATE TABLE directors_films (
  id serial PRIMARY KEY,
  director_id integer REFERENCES directors(id),
  film_id integer REFERENCES films(id)
);

INSERT INTO directors_films (film_id, director_id)
VALUES (1,1),
       (2,2),
       (3,3),
       (4,4),
       (5,5),
       (6,6),
       (7,3),
       (8,7),
       (9,8),
       (10,4);

SELECT (id, director_id) FROM films;

ALTER TABLE films
DROP COLUMN director_id;


SELECT f.title, d.name FROM films AS f
INNER JOIN directors_films AS df ON f.id = df.film_id
INNER JOIN directors AS d ON df.director_id = d.id
ORDER BY f.title ASC;


INSERT INTO films (title, year, genre, duration)
VALUES ('Fargo', 1996, 'comedy', 122),
       ('No Country for Old Men', 2007, 'western', 122),
       ('Sin City', 2005, 'crime', 124),
       ('Spy Kids', 2001, 'scifi', 88);

INSERT INTO directors (name)
VALUES ('Joel Coen'),
       ('Ethan Coen'),
       ('Frank Miller'),
       ('Robert Rodriguez');

INSERT INTO directors_films (film_id, director_id)
VALUES (11,9),
       (12,9),
       (12,10),
       (13,11),
       (13,12),
       (14,12);


SELECT directors.name, count(films.id) FROM directors
  LEFT OUTER JOIN directors_films ON directors.id = directors_films.director_id
  LEFT OUTER JOIN films ON directors_films.film_id = films.id
GROUP BY directors.name
ORDER BY count DESC, directors.name ASC;