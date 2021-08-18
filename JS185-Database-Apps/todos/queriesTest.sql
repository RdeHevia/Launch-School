SELECT * FROM todos
WHERE todolist_id = 1
ORDER BY done DESC, title;

SELECT * FROM todos
WHERE todolist_id = 1 AND id = 2;

DELETE FROM todos
WHERE todolist_id = 1 AND id = 2;

SELECT * FROM todos
WHERE todolist_id = 1;

UPDATE todos
SET done = true
WHERE todolist_id = 1;

INSERT INTO todos(title, todolist_id)
VALUES (title, todolist_id);

SELECT * FROM todos WHERE todolist_id = 2;
SELECT * FROM todolists WHERE id = 2;

DELETE FROM todos WHERE todolist_id = 2;
DELETE FROM todolists WHERE id = 2;

UPDATE todolists
SET title = $1
WHERE id = $2;


DELETE FROM todolists;

ALTER TABLE todolists
ADD COLUMN username text NOT NULL;

ALTER TABLE todos
ADD COLUMN username text NOT NULL;