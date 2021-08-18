SELECT date, round((low + high) / 2.0,1) AS average FROM temperatures
WHERE date BETWEEN '3-2-2016' AND '3-8-2016';