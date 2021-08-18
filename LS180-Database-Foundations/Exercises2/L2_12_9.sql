SELECT genre, count(id) FROM films
GROUP BY genre
ORDER BY count DESC;