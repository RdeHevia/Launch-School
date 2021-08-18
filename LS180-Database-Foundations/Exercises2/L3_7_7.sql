UPDATE orders
SET product_id = 1
WHERE product_id IS NULL;

ALTER TABLE orders
ALTER COLUMN product_id SET NOT NULL;