SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM products;
SELECT * FROM customers;

SELECT orders.*, products.*
FROM orders
JOIN order_items ON (orders.id = order_items.order_id)
JOIN products ON (order_items.product_id = products.id);









SELECT DISTINCT c.customer_name AS "Customers who like Fries"
FROM customers AS c
JOIN orders AS o
ON (c.id = o.customer_id)
JOIN order_items AS oi 
ON (o.id = oi.order_id)
JOIN products AS p 
ON (oi.product_id = p.id)
WHERE p.product_name = 'Fries';







-- OUTPUT:
--  - product_name, number_of_orders // ORDER BY product_name ASC
-- CONDITIONS:
--  - number_of_orders > 0

SELECT p.product_name, count(oi.order_id)
FROM products AS p
JOIN order_items AS oi
ON (p.id = oi.product_id)
GROUP BY p.product_name
ORDER BY p.product_name ASC;