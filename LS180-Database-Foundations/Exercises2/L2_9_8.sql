ALTER TABLE temperatures
ALTER COLUMN rainfall TYPE numeric(3,1);

UPDATE temperatures
SET rainfall = rainfall / 25.4;