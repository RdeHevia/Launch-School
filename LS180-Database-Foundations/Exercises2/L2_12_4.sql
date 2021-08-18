SELECT genre FROM films
GROUP BY genre;

SELECT genre FROM films
GROUP BY genre
HAVING count(id) > 0;