ALTER TABLE orders
ADD FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE orders
ALTER COLUMN product_id SET NOT NULL;