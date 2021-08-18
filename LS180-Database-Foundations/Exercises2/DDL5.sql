ALTER TABLE stars
ADD CHECK(spectral_type ~'^[OBAFGJM]$');

-- OR
-- ALTER TABLE stars
-- ADD CHECK (spectral_type IN ('O', 'B', 'A', 'F', 'G', 'K', 'M')),
-- ALTER COLUMN spectral_type SET NOT NULL;

ALTER TABLE stars
ALTER COLUMN spectral_type SET NOT NULL;