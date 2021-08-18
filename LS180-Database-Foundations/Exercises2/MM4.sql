SELECT services.description FROM customers_services
RIGHT OUTER JOIN services ON services.id = customers_services.service_id
WHERE customers_services.customer_id IS NULL;

SELECT description FROM services
WHERE id NOT IN (
  SELECT service_id FROM customers_services
);