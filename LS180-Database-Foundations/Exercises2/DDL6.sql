ALTER TABLE stars
DROP CONSTRAINT stars_spectral_type_check;

CREATE TYPE spectral AS ENUM ('O','B','A','F','G','K','M');

ALTER TABLE stars
ALTER COLUMN spectral_type TYPE spectral 
                           USING spectral_type::spectral;