SELECT * FROM customers
WHERE id NOT IN (
  SELECT customer_id FROM customers_services
);

SELECT customers.* FROM customers
LEFT OUTER JOIN customers_services ON customers.id = customers_services.customer_id
WHERE customers_services.customer_id IS NULL;