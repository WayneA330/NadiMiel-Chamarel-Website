-- CREATE TABLE product (
--  	product_id SERIAL PRIMARY KEY,
--  	product_name_fr VARCHAR(100) NOT NULL,
-- 		product_name_eng VARCHAR(100) NOT NULL,
--  	product_description_fr TEXT NOT NULL,
-- 		product_description_eng TEXT NOT NULL,
--  	unit_in_stock INTEGER,
--  	ordered INTEGER,
--  	picture TEXT,
--  	unit VARCHAR(100),
--  	price NUMERIC NOT NULL,
--  	category TEXT NOT NULL
-- );

-- CREATE TABLE customer (
--  	customer_id SERIAL PRIMARY KEY,
--  	first_name VARCHAR(100) NOT NULL,
--  	last_name VARCHAR(100) NOT NULL,
--  	address TEXT NOT NULL,
--  	phone SMALLINT NOT NULL,
--  	created TIMESTAMP,
--  	last_logged_in TIMESTAMP
-- );

-- CREATE TABLE admin (
--  	email TEXT NOT NULL,
--  	password TEXT NOT NULL
-- );

-- CREATE TABLE orders (
--    	order_id SERIAL PRIMARY KEY,
--    	order_date TIMESTAMP NOT NULL,
--    	order_status VARCHAR(100) NOT NULL,
--    	quantity INTEGER NOT NULL,
--    	total_amount NUMERIC NOT NULL,
--    	customer_id INTEGER,
--   	FOREIGN KEY(customer_id) REFERENCES customer(customer_id)
-- );

-- CREATE TABLE recipe (
--   	recipe_id SERIAL PRIMARY KEY,
--  	recipe_name_fr TEXT NOT NULL,
-- 		recipe_name_eng TEXT NOT NULL,
--  	recipe_description_fr TEXT NOT NULL,
-- 		recipe_description_eng TEXT NOT NULL,
--   	recipe_article_fr TEXT NOT NULfL,
-- 		recipe_article_eng TEXT NOT NULL,
--   	product_id INTEGER,
--   	FOREIGN KEY (product_id) REFERENCES product(product_id)
-- );

-- CREATE TABLE sales (
--   	order_id INTEGER,
--   	FOREIGN KEY (order_id) REFERENCES orders(order_id),
--  	product_id INTEGER,
--  	FOREIGN KEY (product_id) REFERENCES product(product_id),
--   	quantity_per_product INTEGER NOT NULL
-- );

-- ALTER TABLE product
-- ALTER COLUMN picture TYPE TEXT;

-- ALTER TABLE customer ADD COLUMN email VARCHAR(100);

-- INSERT INTO customer (first_name, last_name, address, phone, email)
-- VALUES('Wayne', 'Celestin', 'Highlands-Phoenix', '58127670', 'waynecelestin.a3@gamil.com');

-- INSERT INTO customer (first_name, last_name, address, phone, email)
-- VALUES('Henry', 'Oko', 'Beau-Bassin', '52442340', 'henryoko@gamil.com');

-- ALTER TABLE customer
-- ALTER COLUMN phone TYPE NUMERIC;

-- DELETE FROM customer WHERE customer_id = 3 OR customer_id = 4;

-- INSERT INTO customer (first_name, last_name, address, phone, email)
-- VALUES('Henry', 'Oko', 'Beau-Bassin', '52442340', 'henryoko2@gamil.com');

-- DELETE FROM product;

-- TRUNCATE TABLE product RESTART IDENTITY;
-- TRUNCATE TABLE recipe RESTART IDENTITY;

-- ALTER TABLE product ALTER COLUMN product_id RESTART WITH 1;

-- SELECT setval(pg_get_serial_sequence('product', 'product_id'), coalesce(MAX(product_id), 1))
-- from product;

-- UPDATE product SET picture = 'Miel Multifleurs.jpg' WHERE product_id = 10;

SELECT * FROM product;