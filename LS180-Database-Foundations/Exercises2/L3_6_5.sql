SELECT events.name, count(tickets.id) AS popularity FROM events
LEFT OUTER JOIN tickets ON events.id = tickets.event_id
GROUP BY events.name
ORDER BY count(tickets.id) DESC;


 