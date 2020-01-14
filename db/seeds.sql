INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Sample 1", "Chicken", false, 10.50);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Sample 2", "Chicken", false, 15.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Chicken Sample 3", "Chicken", false, 14.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Beef Sample 1", "Beef", false, 20.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Beef Sample 2", "Beef", false, 18.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Beef Sample 3", "Beef", false, 10.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Seafood Sample 1", "Seafood", false, 11.45);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Seafood Sample 2", "Seafood", false, 18.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Seafood Sample 3", "Seafood", false, 15.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Appetizer Sample 1", "Appetizers", false, 11.50);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Appetizer Sample 2", "Appetizers", false, 12.75);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Appetizer Sample 3", "Appetizers", false, 13.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Vegetable Sample 1", "Vegetables", false, 9.00);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Vegetable Sample 2", "Vegetables", false, 9.99);

INSERT INTO menu(item_name, category, selected, price)
VALUES ("Vegetable Sample 3", "Vegetables", false, 8.50);

INSERT INTO customers(customer_number, customer_name)
VALUES ("888-888-888", "John");

INSERT INTO orders(itemize_id, subtotal,taxes,total,time,date)
VALUES ("1,2,3", 34.95, 2.32, 37.27, "01:39:31PM", "01/09/2020");

INSERT INTO employees (employee_position,employee_firstName,employee_lastName,employee_id) 
VALUES ("Orders,Employees,Menu","John","Doe",99)