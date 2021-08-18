SELECT * FROM customers_services
WHERE service_id = (
  SELECT id FROM services
  WHERE description = 'Bulk Email' OR description = 'Chen Ke-Hua'
);

DELETE FROM customers_services
WHERE service_id = (
  SELECT id FROM services
  WHERE description = 'Bulk Email' OR description = 'Chen Ke-Hua'
);

DELETE FROM services
WHERE description = 'Bulk Email' OR description = 'Chen Ke-Hua';