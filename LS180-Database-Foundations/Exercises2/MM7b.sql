SELECT sum(services.price) FROM services
INNER JOIN customers_services ON customers_services.service_id = services.id;