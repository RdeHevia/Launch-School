INSERT INTO authors (name)
VALUES ('William Gibson'),
       ('Iain M. Banks'),
       ('Philip K. Dick');

INSERT INTO books (title, isbn, author_id)
VALUES ('Neuromancer',9780441569595,1),
       ('Consider Phlebas',9780316005388,2),
       ('Idoru',9780425158647,1),
       ('The State of the Art',0929480066,2),
       ('The Simulacra ',9780547572505,3),
       ('Pattern Recognition',9780425198681,1),
       ('A Scanner Darkly',9780547572178,3);


SELECT 1 WHERE EXISTS
  (SELECT id FROM books
    WHERE isbn = '9780316005388');

SELECT name FROM authors WHERE id
  IN (SELECT author_id FROM books
      WHERE title LIKE 'The%');

SELECT name FROM authors WHERE id NOT IN
  (SELECT author_id FROM books
    WHERE title LIKE 'The%');

SELECT name FROM authors WHERE length(name) > ANY
(SELECT length(title) FROM books WHERE title LIKE 'The%');