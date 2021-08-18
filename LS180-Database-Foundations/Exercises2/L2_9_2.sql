ALTER TABLE employees
ALTER COLUMN department SET DEFAULT 'unassigned';

UPDATE TABLE employees
SET department = 'unassigned'
WHERE department IS NULL;

ALTER TABLE employees
ALTER COLUMN department SET NOT NULL;