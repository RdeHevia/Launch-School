SELECT * FROM customers
WHERE id IN (
  SELECT customer_id FROM customers_services
);

SELECT DISTINCT customers.* FROM customers
INNER JOIN customers_services ON customers.id = customers_services.customer_id;