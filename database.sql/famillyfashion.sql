UPDATE orders
SET status = 'Delivered'
WHERE status = pending;