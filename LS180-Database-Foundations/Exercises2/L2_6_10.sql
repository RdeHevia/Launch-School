-- profit = menu_price - ingredient_cost

SELECT item, (menu_price - ingredient_cost) AS profit FROM menu_items
ORDER BY profit DESC LIMIT 1;

SELECT item, menu_price - ingredient_cost AS profit FROM menu_items
WHERE menu_price - ingredient_cost = (
  SELECT max(menu_price - ingredient_cost) FROM menu_items
);