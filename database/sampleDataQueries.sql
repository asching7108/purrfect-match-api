SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE Shelter;
TRUNCATE Pet;
TRUNCATE User;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Shelter (ShelterName, Address, EmailAddress, Password, PhoneNumber, Website, LastUpdated)
VALUES
  ('Purrfect Cat Rescue Group', '101 Banana Rd, Bellevue, WA 98004', 'info@purrfect-cat.com', 'password', 1234567890, 'https://purrfect-cat.com', '2022-01-27 12:32:05'),
  ('Best Friends Shelter', '123 Sugartown Rd, Paoli, PA 19301', 'bfs@bfs.com', 'password', 1112223456, 'https://bfs.com', '2022-01-27 12:32:05'),
  ('Paws Animal Shelter', '123 Sugartown Rd, Portland, OR 97206', 'admin@paws.com', 'password', 1111221156, 'https://paws-animal-shelter.com', '2022-01-27 12:32:05');

INSERT INTO Pet (Name, TypeOfAnimal, Breed, Sex, Age, Size, ShelterID, Picture, Availability, LastUpdated, GoodWithOtherAnimals, GoodWithChildren, MustBeLeashed, Neutered, Vaccinated, HouseTrained, Description)
VALUES
  ('Valley', 'Dog', 'Golden Retriever', 'Male', 1, 'Large, 45lbs', 1, '', 'Available', '2022-01-27 12:32:05', 1, 1, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
  ('River', 'Dog', 'Mixed', 'Male', 4, 'Medium, 25lbs', 1, '', 'Available', '2022-01-27 12:32:05', 0, 1, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
  ('Adeline', 'Cat', 'Domestic Shorthair', 'Female', 2, 'Small, 8.8lbs', 2, '', 'Available', '2022-01-27 12:32:05', 0, 0, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
   ('CHIP', 'Dog', 'Chihuahua', 'Male', 1, 'Small, 5lbs', 1, '', 'Pending', '2022-01-27 12:32:05', 1, 1, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
  ('COOPER', 'Dog', 'Mixed', 'Male', 4, 'Medium, 25lbs', 2, '', 'Available', '2022-01-27 12:32:05', 0, 1, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
  ('Choco', 'Cat', 'American Shorthair', 'Male', 9, 'Small, 13lbs', 1, '', 'Pending', '2022-01-27 12:32:05', 0, 0, 0, 1, 1, 1,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
   ('Rab', 'Rabbit', 'Lionhead rabbit', 'Male', 2, 'Small, 4lbs', 1, '', 'Available', '2022-01-27 12:32:05', 0, 0, 0, 0, 0, 0,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.'),
   ('Ham', 'Hamster', 'Syrian hamsters', 'Female', 2, 'Small, 3lbs', 2, '', 'Pending', '2022-01-27 12:32:05', 0, 0, 0, 0, 0, 0,
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.');

INSERT INTO User (FirstName, LastName, EmailAddress, Password, Address, ZipCode, DistancePreference, LastUpdated)
VALUES
  ('Esther', 'Lin', 'linhsin@oregonstate.edu', 'password', NULL, 10001, NULL, '2022-01-27 12:32:05');
