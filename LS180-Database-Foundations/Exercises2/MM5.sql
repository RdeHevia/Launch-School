SELECT customers.name, string_agg(services.description, ', ') AS services FROM customers
LEFT OUTER JOIN customers_services ON customers.id = customers_services.customer_id
LEFT OUTER JOIN services ON customers_services.service_id = services.id
GROUP BY customers.id;