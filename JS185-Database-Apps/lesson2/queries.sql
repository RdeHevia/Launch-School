ALTER TABLE expenses
ADD CHECK (amount >= 0.01);

INSERT INTO expenses (amount, memo, created_on)
VALUES (14.56, 'Pencils', now()),
       (3.29, 'Coffee', now()),
       (49.99, 'Text Editor', now());


INSERT INTO expenses (amount, memo, created_on)
VALUES (3.59, 'More coffee', now())


SELECT * FROM expenses
WHERE memo ~* 'coffee';