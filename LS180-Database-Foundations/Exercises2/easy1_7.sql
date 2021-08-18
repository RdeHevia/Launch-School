-- SELECT to confirm target
SELECT * FROM birds
WHERE ROW(age, species) = ROW(3, 'Finch');

DELETE FROM birds
WHERE ROW(age, species) = ROW(3, 'Finch');