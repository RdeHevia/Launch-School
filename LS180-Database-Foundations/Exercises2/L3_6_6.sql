SELECT customers.id, customers.email, count(DISTINCT tickets.event_id) FROM customers
INNER JOIN tickets ON customers.id = tickets.customer_id
GROUP BY customers.id
HAVING count(DISTINCT tickets.event_id) = 3
ORDER BY customers.id, customers.email;


SELECT id, email FROM customers
WHERE id IN (
  SELECT customer_id FROM tickets
  GROUP BY customer_id
  HAVING count(DISTINCT event_id) = 3
)
ORDER BY id ASC;