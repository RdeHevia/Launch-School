SELECT year / 10 * 10 AS decade, round(avg(duration),0) AS avg_duration FROM films
GROUP BY decade
ORDER BY decade ASC;