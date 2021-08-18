SELECT state, count(id) FROM people
GROUP BY state
ORDER BY count DESC
LIMIT 10;


SELECT state FROM (
  SELECT state, count(id) FROM people
  GROUP BY state
  ORDER BY count DESC
  LIMIT 10
) AS most_populated_states;