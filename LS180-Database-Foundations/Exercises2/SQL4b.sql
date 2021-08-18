SELECT max(count) FROM (
  SELECT count(bidder_id) FROM bids
  GROUP BY bidder_id
) AS bids_per_bidder;



SELECT bidder_id, count(bidder_id) FROM bids
GROUP BY bidder_id;