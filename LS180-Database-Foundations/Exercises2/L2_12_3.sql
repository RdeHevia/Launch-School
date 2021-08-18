SELECT DISTINCT genre FROM films;

SELECT genre FROM films
GROUP BY genre
HAVING count(id) > 0;
