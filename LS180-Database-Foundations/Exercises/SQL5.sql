-- Find maximum of (calculate number of bids for each bidder)

SELECT max(bids_per_bidder.count) FROM (
  SELECT count(bidder_id) FROM bids
  GROUP BY bidder_id
) AS bids_per_bidder;

SELECT bidder_id, count(bidder_id) FROM bids
GROUP BY bidder_id;