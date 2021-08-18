SELECT * FROM customers
WHERE id NOT IN (
  SELECT DISTINCT customer_id FROM customers_services
);

SELECT DISTINCT customers.* FROM customers
FULL OUTER JOIN customers_services ON customers.id = customers_services.customer_id
WHERE customers_services.service_id IS NULL;
