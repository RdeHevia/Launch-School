SELECT sum(services.price) FROM services
INNER JOIN customers_services ON customers_services.service_id = services.id
WHERE price > 100;

SELECT customers_services.*, services.* FROM services
FULL OUTER JOIN customers_services ON customers_services.service_id = services.id
WHERE services.price > 100;

SELECT (
  (SELECT count(customers.id) FROM customers) *
  (SELECT sum(services.price) FROM services WHERE services.price > 100)
) AS sum;
