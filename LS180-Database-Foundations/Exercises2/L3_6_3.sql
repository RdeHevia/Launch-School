SELECT count(customer_id) FROM (
  SELECT DISTINCT customer_id FROM tickets
) as distinct_customers;

SELECT count(DISTINCT customer_id) FROM tickets;