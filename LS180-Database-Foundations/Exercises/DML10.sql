DELETE FROM parts
WHERE device_id = (
  SELECT id FROM devices
  WHERE name = 'Accelerometer'
);

DELETE FROM devices
WHERE name = 'Accelerometer';