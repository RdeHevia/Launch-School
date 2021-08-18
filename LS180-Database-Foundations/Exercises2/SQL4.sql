SELECT name FROM bidders
WHERE EXISTS (
  SELECT 1 FROM bids
  WHERE bidders.id = bidder_id
);