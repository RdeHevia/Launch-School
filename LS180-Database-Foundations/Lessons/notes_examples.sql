CREATE DATABASE sql_notes_examples;

CREATE TABLE my_table1 (
  id serial PRIMARY KEY,
  column1 text NOT NULL
);

CREATE TABLE my_table2 (
  id serial PRIMARY KEY,
  column_A decimal(5,2),
  id_table_1 integer REFERENCES my_table1(id)
);

ALTER TABLE my_table1
ADD COLUMN column2 varchar(25) UNIQUE NOT NULL;


ALTER TABLE my_table1
ALTER COLUMN column1 TYPE varchar(100);

ALTER TABLE my_table2
ALTER COLUMN column_A SET NOT NULL;

ALTER TABLE my_table2
ADD CONSTRAINT min_value CHECK (column_A >= 30);

ALTER TABLE my_table2
RENAME TO my_table_A;

ALTER TABLE my_table1
ALTER COLUMN column1
DROP NOT NULL;

DROP TABLE my_table3;

ALTER TABLE my_table1
DROP COLUMN column3;

ALTER TABLE my_table2
DROP CONSTRAINT min_value;

ALTER TABLE my_table2
RENAME COLUMN column_AA to column_A;

UPDATE my_table1
SET column1 = 'all rows';

UPDATE my_table1
SET column1 = 'some rows'
WHERE column2 = 123 OR column2 = 456;

DELETE FROM my_table1;

DELETE FROM my_table1
WHERE column1 = 123 AND id > 45;

CREATE TABLE my_table3 (
  id serial PRIMARY KEY,
  other_id integer REFERENCES my_table1 (id),
  column_x varchar NOT NULL UNIQUE
);

ALTER TABLE my_table3
DROP CONSTRAINT my_table3_other_id_fkey;

ALTER TABLE my_table3
ADD FOREIGN KEY (other_id) REFERENCES my_table1(id);

ALTER TABLE my_table3
ADD CONSTRAINT my_table3_my_table1_fk FOREIGN KEY (other_id) REFERENCES my_table1(id);