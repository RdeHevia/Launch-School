ALTER TABLE stars
ADD CHECK (spectral_type SIMILAR TO '[OBAFGKM]'),
ALTER COLUMN spectral_type SET NOT NULL;


ALTER TABLE stars
DROP CONSTRAINT stars_spectral_type_check,
ALTER COLUMN spectral_type DROP NOT NULL;

