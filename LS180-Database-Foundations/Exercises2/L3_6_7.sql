SELECT events.name AS event, events.starts_at,
       sections.name AS section, 
       seats.row, seats.number AS seat
FROM customers
INNER JOIN tickets ON customers.id = tickets.customer_id
INNER JOIN events ON tickets.event_id = events.id
INNER JOIN seats ON tickets.seat_id = seats.id
INNER JOIN sections ON seats.section_id = sections.id
WHERE customers.email = 'gennaro.rath@mcdermott.co';