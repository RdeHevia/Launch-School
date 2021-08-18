ALTER TABLE birds
ADD CHECK (age > 0);


INSERT INTO birds (name, age, species)
VALUES ('A', 0, 'B');