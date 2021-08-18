-- 1mm for every degree > 35
-- rainfall = 1 * (avg_temp - 35)

SELECT date,
       round((low + high) / 2.0,1) AS average,
       round((low + high) / 2.0,1) - 35 AS delta
       FROM temperatures
WHERE round((low + high) / 2.0,1) - 35 > 0;


UPDATE temperatures
SET rainfall = round((low + high) / 2.0, 1) - 35
WHERE round((low + high) / 2.0,1) - 35 > 0;