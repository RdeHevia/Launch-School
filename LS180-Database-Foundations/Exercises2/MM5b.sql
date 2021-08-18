SELECT c.name, string_agg(s.description, ', ') FROM customers AS c
LEFT OUTER JOIN customers_services AS cs ON c.id = cs.customer_id
LEFT OUTER JOIN services AS s ON cs.service_id = s.id
GROUP BY c.id;