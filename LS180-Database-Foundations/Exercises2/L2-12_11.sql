SELECT genre, sum(duration) AS total_duration FROM films
GROUP BY genre
ORDER BY total_duration ASC;