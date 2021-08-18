SELECT max(bid_counts.count) FROM (
  SELECT count(bidder_id) FROM bids
  GROUP BY bidder_id
) AS bid_counts;


SELECT bidder_id, count(bidder_id) AS number_of_bids FROM bids
GROUP BY bidder_id;