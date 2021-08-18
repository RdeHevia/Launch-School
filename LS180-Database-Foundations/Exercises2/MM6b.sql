SELECT services.description, count(customers_services.customer_id) FROM services
INNER JOIN customers_services ON services.id = customers_services.service_id
GROUP BY services.id
HAVING count(customers_services.customer_id) >= 3;