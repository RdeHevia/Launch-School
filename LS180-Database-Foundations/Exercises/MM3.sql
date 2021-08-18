SELECT customers.* FROM customers
LEFT OUTER JOIN customers_services ON customers.id = customers_services.customer_id
WHERE customers_services.customer_id IS NULL;


SELECT customers.*, services.* FROM customers
FULL OUTER JOIN customers_services ON customers.id = customers_services.customer_id
FULL OUTER JOIN services ON customers_services.service_id = services.id
WHERE customers_services.customer_id IS NULL OR customers_services.service_id IS NULL;