SELECT genre, round(avg(duration), 0) AS avg_duration FROM films
GROUP BY genre;