INSERT INTO Users(firstName, lastName, username, password)
VALUES ('Bob', 'James', 'Bobby-J', 'password');

INSERT INTO Categories(type, type_name)
VALUES ('Groceries', 'grocery_or_supermarket'),
('Pharmacy', 'pharmacy'),
('Banking', 'bank'),
('Mall', 'shopping_mall'),
('Post Office', 'post_office'),
('Electronics', 'electronics_store'),
('Hardware', 'hardware_store'),
('Car Wash', 'car_wash'),
('Flower Shop', "florist"),
('Bakery', 'bakery'),
('Laundry', 'laundry'),
('Spirits', 'liquor_store');


INSERT INTO Items(task, body, category, CategoryId, UserId)
VALUES ('Grocery Shopping', 'need onions!', 'Groceries', 1, 1),
('food', 'eat it', 'Groceries', 1, 1),
('clean', 'take clothes', 'Dry Cleaner', 4, 1);