SELECT round((
  SELECT count (DISTINCT customer_id) FROM tickets
) /
(
  SELECT count (id) FROM customers
)::numeric * 100.00, 2) AS percentage;


SELECT round(count(DISTINCT tickets.customer_id) / count(DISTINCT customers.id)::numeric * 100.00,2) FROM customers
LEFT OUTER JOIN tickets ON customers.id = tickets.customer_id;
