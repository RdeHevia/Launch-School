SELECT sum(services.price) FROM services
INNER JOIN customers_services ON services.id = customers_services.service_id
WHERE services.price > 100;


SELECT services.price FROM services
INNER JOIN customers_services ON services.id = customers_services.service_id
WHERE services.price > 100;