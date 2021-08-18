CREATE TABLE reviews (
  id serial PRIMARY KEY,
  product_id integer NOT NULL REFERENCES products(id),
  review text NOT NULL
);