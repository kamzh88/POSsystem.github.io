INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Broccoli", "Chicken", false, 10.50);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Beef Broccoli", "Beef", false, 11.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Shrimp Broccoli", "Seafood", false, 11.45);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Marsala", "Chicken", false, 15.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Picatta", "Chicken", false, 14.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Spaghetti & Clams", "Seafood", false, 18.00);

INSERT INTO customers(customer_number, customer_name)
VALUES ("888-888-888", John);

INSERT INTO orders(itemize_id, subtotal,taxes,total,time,date)
VALUES ("1,2,3", 34.95, 2.32, 37.27, "01:39:31PM", "01/09/2020");