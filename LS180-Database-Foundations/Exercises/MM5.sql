SELECT customers.name, string_agg(services.description, ', ') AS services
FROM customers
LEFT OUTER JOIN customers_services ON customers.id = customers_services.customer_id
LEFT OUTER JOIN services ON services.id = customers_services.service_id
GROUP BY customers.name;