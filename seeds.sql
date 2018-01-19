INSERT INTO Users(firstName, lastName, username, password)
VALUES ('Bob', 'James', 'Bobby-J', 'password');

INSERT INTO Categories(type)
VALUES ('Groceries'),
('Pharmacy'),
('Banking'),
('Dry Cleaner'),
('Post Office'),
('Electronics');

INSERT INTO Items(task, body, category, CategoryId, UserId)
VALUES ('Grocery Shopping', 'need onions!', 'Groceries', 1, 1),
('food', 'eat it', 'Groceries', 1, 1),
('clean', 'take clothes', 'Dry Cleaner', 4, 1);