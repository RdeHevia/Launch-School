SELECT id FROM items
WHERE ROW('Painting', 100.00, 250.00) =
      ROW(name, initial_price, sales_price);