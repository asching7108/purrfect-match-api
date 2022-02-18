SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE Shelter;
TRUNCATE Pet;
TRUNCATE User;
TRUNCATE PetBreed;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Shelter (ShelterName, Address, EmailAddress, Password, PhoneNumber, Website, LastUpdated)
VALUES
  ('Purrfect Cat Rescue Group', '101 Banana Rd, Bellevue, WA 98004', 'info@purrfect-cat.com', '$2a$10$XKPH0cYVDS8YXlm17.eLze/heo7Rj1PWwI37H0w0YUHixTLtD.y7u', 1234567890, 'https://purrfect-cat.com', '2022-01-27 12:32:05'),
  ('Best Friends Shelter', '123 Sugartown Rd, Paoli, PA 19301', 'bfs@bfs.com', '$2a$10$k.vVXy3ZvhPLjOdmNlU37u44hQj3M58Ddb4s/xHDTkJOzsZWjelJi', 1112223456, 'https://bfs.com', '2022-01-27 12:32:05'),
  ('Paws Animal Shelter', '123 Sugartown Rd, Portland, OR 97206', 'admin@paws.com', '$2a$10$oZqEv1YR1NGdry8u05M.5.K.AAK/El4IsiHzAuyhNz7uEvy0w3VUi', 1111221156, 'https://paws-animal-shelter.com', '2022-01-27 12:32:05');

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
  ('Esther', 'Lin', 'linhsin@oregonstate.edu', '$2a$10$UEYuur6YO08R8mgcHL8wP.DDtExNajJD/m8plsHFSjy45oNDdEUgC', NULL, 10001, NULL, '2022-01-27 12:32:05');

INSERT INTO PetNewsItem (PetID, DatePosted, NewsItem)
VALUES
  (1, '2022-02-16 13:26:04', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum iaculis est, eu cursus quam fringilla at. Nulla eget aliquam nunc. Suspendisse porttitor dignissim dui a elementum. Praesent non nibh sed urna malesuada ornare. Duis in lectus nunc. Suspendisse rutrum feugiat metus, vel viverra massa placerat nec. Etiam et augue at mi sodales ullamcorper a vitae purus. Vestibulum vitae convallis neque, sed vulputate diam. Cras eu interdum sem, vel bibendum sapien.'),
  (1, '2022-02-16 13:27:44', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum iaculis est, eu cursus quam fringilla at. Nulla eget aliquam nunc. Suspendisse porttitor dignissim dui a elementum. Praesent non nibh sed urna malesuada ornare. Duis in lectus nunc. Suspendisse rutrum feugiat metus, vel viverra massa placerat nec. Etiam et augue at mi sodales ullamcorper a vitae purus. Vestibulum vitae convallis neque, sed vulputate diam. Cras eu interdum sem, vel bibendum sapien.'),
  (1, '2022-02-16 13:34:00', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum iaculis est, eu cursus quam fringilla at. Nulla eget aliquam nunc. Suspendisse porttitor dignissim dui a elementum. Praesent non nibh sed urna malesuada ornare. Duis in lectus nunc. Suspendisse rutrum feugiat metus, vel viverra massa placerat nec. Etiam et augue at mi sodales ullamcorper a vitae purus. Vestibulum vitae convallis neque, sed vulputate diam. Cras eu interdum sem, vel bibendum sapien.');

INSERT INTO PetBreed (TypeOfAnimal, Breed)
VALUES
  ('Cat', 'American ShortHair'),
  ('Cat', 'Domestic ShortHair'),
  ('Cat', 'Other'),
  ('Dog', 'Golden Retriever'),
  ('Dog', 'Mixed'),
  ('Dog', 'Other'),
  ('Other', 'Other');
