SELECT services.description, count(services.id) FROM services
INNER JOIN customers_services AS cs ON services.id = cs.service_id
GROUP BY services.description
HAVING count(services.id) >= 3
ORDER BY description;

