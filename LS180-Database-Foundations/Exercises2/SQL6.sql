SELECT name,
       (SELECT count(item_id) FROM bids WHERE item_id = items.id)
FROM items;

SELECT items.name, count(bids.item_id) FROM items
LEFT OUTER JOIN bids ON items.id = bids.item_id
GROUP BY items.name;