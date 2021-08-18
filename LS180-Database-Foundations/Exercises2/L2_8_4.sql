SELECT substring(email,'@.*$') AS domain,
       count(id)
       FROM people
GROUP BY domain
ORDER BY count DESC;