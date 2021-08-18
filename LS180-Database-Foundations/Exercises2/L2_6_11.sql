SELECT item,
      round(prep_time * 13 / 60.0,2) AS prep_cost,
      ingredient_cost,
      menu_price,
      round(menu_price - ingredient_cost - prep_time * 13 / 60.0,2) AS profit
FROM menu_items
ORDER BY profit DESC;

