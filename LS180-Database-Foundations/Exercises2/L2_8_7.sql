SELECT given_name, email FROM people
WHERE substring(email,'@.*') = '@teleworm.us'
LIMIT 10;


UPDATE people
SET given_name = upper(given_name)
WHERE substring(email,'@.*') = '@teleworm.us';