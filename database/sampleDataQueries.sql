SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE Shelter;
TRUNCATE Pet;
TRUNCATE User;
TRUNCATE PetNewsItem;
TRUNCATE PetBreed;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Shelter (ShelterName, Address, EmailAddress, Password, PhoneNumber, Website, LastUpdated)
VALUES
  ('Anoka County Humane Society', '3939 N 7th Ave, Anoka, MN 55303', 'admin@anokahumane.com', '$2a$10$J36kZEKFkCE0G1HKiRPw5uPnPOXj7Bb.WGkpMjoL2MfHUSs4omfxa', 7638881234, 'www.anokapets.net', '2022-02-26 11:18:00'),
  ('Purrfect Cat Rescue Group', '101 Banana Rd, Bellevue, WA 98004', 'info@purrfect-cat.com', '$2a$10$XKPH0cYVDS8YXlm17.eLze/heo7Rj1PWwI37H0w0YUHixTLtD.y7u', 1234567890, 'https://purrfect-cat.com', '2022-01-27 12:32:05'),
  ('Best Friends Shelter', '123 Sugartown Rd, Paoli, PA 19301', 'bfs@bfs.com', '$2a$10$k.vVXy3ZvhPLjOdmNlU37u44hQj3M58Ddb4s/xHDTkJOzsZWjelJi', 1112223456, 'https://bfs.com', '2022-01-27 12:32:05'),
  ('Paws Animal Shelter', '123 Sugartown Rd, Portland, OR 97206', 'admin@paws.com', '$2a$10$oZqEv1YR1NGdry8u05M.5.K.AAK/El4IsiHzAuyhNz7uEvy0w3VUi', 1111221156, 'https://paws-animal-shelter.com', '2022-01-27 12:32:05');

INSERT INTO Pet (Name, TypeOfAnimal, Breed, Sex, Age, Size, ShelterID, Picture, Availability, LastUpdated, GoodWithOtherAnimals, GoodWithChildren, MustBeLeashed, Neutered, Vaccinated, HouseTrained, Description)
VALUES
  -- Xander's pets
  ('Valley', 'Dog', 'German Shepherd Dog', 'Female', 1, 'Large, 75lbs', 1, '/images/petimage-valley.jpg', 'Available', '2022-01-27 12:32:05', 1, 1, 0, 1, 1, 1,
   'Doggo ipsum aqua doggo boofers such treat adorable doggo big ol long water shoob pupperino, puggo I am bekom fat borking doggo boof doge. Heck wrinkler stop it fren long water shoob you are doing me a frighten wrinkler, pats stop it fren most angery pupper I have ever seen shoober. Heckin thicc very jealous pupper maximum borkdrive, shibe he made many woofs. Woofer doge super chub long bois, pupperino. Shibe most angery pupper I have ever seen you are doing me a frighten he made many woofs vvv puggo, you are doing me the shock puggorino ur givin me a spook you are doin me a concern. I am bekom fat pats shoob corgo much ruin diet fat boi, yapper sub woofer shibe clouds.'),
  ('River', 'Dog', 'German Shepherd Dog', 'Male', 4, 'Large, 75lbs', 1, '/images/petimage-river.jpg', 'Available', '2022-01-27 12:32:05', 0, 1, 1, 1, 1, 1,
   'Doggo ipsum you are doing me the shock vvv big ol pupper shibe, pupper. Much ruin diet long water shoob dat tungg tho long water shoob, bork ur givin me a spook most angery pupper I have ever seen you are doing me the shock, heckin blep. Smol pupper very taste wow tungg very good spot long doggo, wow very biscit wrinkler very good spot. Such treat very good spot aqua doggo pats porgo big ol pupper, pupper lotsa pats smol. You are doing me the shock you are doing me a frighten thicc porgo fat boi heckin corgo, doggorino fat boi long bois wrinkler.'),
  ('Misty', 'Cat', 'Domestic Shorthair', 'Female', 10, 'Medium', 1, '/images/petimage-misty.jpeg', 'Available', '2022-01-27 12:32:05', 0, 1, 0, 1, 1, 1,
   "Cat ipsum dolor sit amet, sit on the laptop, but sit on human or human is in bath tub, emergency! drowning! meooowww!. Hunt anything that moves sit by the fire jump on fridge, yet i'm going to lap some water out of my master's cup meow. Put butt in owner's face meowsiers and sleep over your phone and make cute snoring noises intently stare at the same spot playing with balls of wool toy mouse squeak roll over and soft kitty warm kitty little ball of furr. Your pillow is now my pet bed cat ass trophy plop down in the middle where everybody walks yet nyan fluffness ahh cucumber!"),
  ('Fraser', 'Cat', 'Domestic Longhair', 'Male', 1, 'Medium', 1, '/images/petimage-fraser.jpg', 'Available', '2022-01-27 12:32:05', 1, 1, 0, 1, 1, 1,
   "Cat ipsum dolor sit amet, play with twist ties white cat sleeps on a black shirt. Run as fast as i can into another room for no reason somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock steal mom's crouton while she is in the bathroom drool yet destroy couch as revenge. Fall asleep on the washing machine. Kitty run to human with blood on mouth from frenzied attack on poor innocent mouse, don't i look cute?"),
  ('Casanova', 'Other', 'Snake', 'Male', 4, '950g', 1, '/images/petimage-casanova.jpg', 'Available', '2022-01-27 12:32:05', 0, 1, 0, 0, 1, 0,
   'Lorem ipssssum dolor ssssit amet, conssssectetur adipisssscing elit. ssssed blandit facilissssissss elit, id volutpat dolor porttitor ssssed. Proin erat diam, venenatissss ac lacinia a, condimentum ac turpissss. Fussssce eu nissssl tempor, feugiat neque vitae, tincidunt esssst.'),

  -- Eriko's pets
  ('Choco', 'Cat', 'Domestic Shorthair', 'Male', 8, 'Large, 12lbs', 2, '/images/petimage-choco.png', 'Available', '2022-01-27 12:32:05', 0, 0, 0, 1, 1, 1,
   "Cat ipsum dolor sit amet, intrigued by the shower. Sit on the laptop. Meow meow, i tell my human jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed, cat ass trophy yet sleep on keyboard cat not kitten around , so sleeps on my head and hack up furballs."),
  ('Latte', 'Cat', 'Domestic Shorthair', 'Female', 1, 'Small', 2, '/images/petimage-latte.jpg', 'Available', '2022-01-27 12:32:05', 0, 0, 0, 1, 1, 1,
   "Cat ipsum dolor sit amet, hopped up on catnip for reaches under door into adjacent room chew master's slippers but good morning sunshine. I'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?!"),
  ('Leon', 'Dog', 'Papillon', 'Male', 1, 'Small', 2, '/images/petimage-leon.png', 'Available', '2022-01-27 12:32:05', 1, 1, 0, 1, 1, 1,
   'Doggo ipsum borkdrive doggorino puggo you are doin me a concern many pats, length boy lotsa pats doggo, you are doing me a frighten puggorino pupperino. heckin bork. ur givin me a spook you are doing me the shock puggorino. Wow such tempt heckin good boys sub woofer I am bekom fat heck blop bork, stop it fren doggo heckin angery woofer much ruin diet ur givin me a spook heckin, very hand that feed shibe doggo heckin angery woofer puggorino what a nice floof. you are doing me the shock long woofer tungg. Shooberino blep heckin good boys doing me a frighten, many pats heck.'),

  -- Esther's pets


  -- Other
  ('Rab', 'Other', 'Rabbit', 'Male', 2, 'Small, 4lbs', 1, '/images/petimage-testRabbit.png', 'Available', '2022-01-27 12:32:05', 0, 0, 0, 0, 0, 0,
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
  ('Cat', 'Abyssinian'),
  ('Cat', 'American Bobtail'),
  ('Cat', 'American Shorthair'),
  ('Cat', 'Bengal'),
  ('Cat', 'Bombay'),
  ('Cat', 'British Shorthair'),
  ('Cat', 'Domestic Longhair'),
  ('Cat', 'Domestic Mediumhair'),
  ('Cat', 'Domestic Shorthair'),
  ('Cat', 'Maine Coon'),
  ('Cat', 'Manx'),
  ('Cat', 'Persian'),
  ('Cat', 'Ragdoll'),
  ('Cat', 'Russian Blue'),
  ('Cat', 'Siamese'),
  ('Cat', 'Snowshoe'),
  ('Cat', 'Turkish Van'),
  ('Cat', 'Other / Unknown'),
  ('Dog', 'Airedale Terrier'),
  ('Dog', 'Akita'),
  ('Dog', 'Alaskan Malamute'),
  ('Dog', 'American Bulldog'),
  ('Dog', 'American Bully'),
  ('Dog', 'American Cocker Spaniel'),
  ('Dog', 'American Foxhound'),
  ('Dog', 'American Staffordshire Terrier'),
  ('Dog', 'Anatolian Shepherd'),
  ('Dog', 'Australian Cattle Dog'),
  ('Dog', 'Australian Shepherd'),
  ('Dog', 'Basset Hound'),
  ('Dog', 'Beagle'),
  ('Dog', 'Belgian Malinois'),
  ('Dog', 'Belgian Tervuren'),
  ('Dog', 'Bernese Mountain Dog'),
  ('Dog', 'Bichon Frise'),
  ('Dog', 'Black and Tan Coonhound'),
  ('Dog', 'Bloodhound'),
  ('Dog', 'Bluetick Coonhound'),
  ('Dog', 'Border Collie'),
  ('Dog', 'Border Terrier'),
  ('Dog', 'Boston Terrier'),
  ('Dog', 'Boxer'),
  ('Dog', 'Brittany Spaniel'),
  ('Dog', 'Bull Terrier'),
  ('Dog', 'Bullmastiff'),
  ('Dog', 'Cairn Terrier'),
  ('Dog', 'Cane Corso'),
  ('Dog', 'Cardigan Welsh Corgi'),
  ('Dog', 'Cavalier King Charles Spaniel'),
  ('Dog', 'Chesapeake Bay Retriever'),
  ('Dog', 'Chihuahua'),
  ('Dog', 'Chow Chow'),
  ('Dog', 'Collie'),
  ('Dog', 'Dachshund'),
  ('Dog', 'Dalmation'),
  ('Dog', 'Doberman Pinscher'),
  ('Dog', 'Dogo Argentino'),
  ('Dog', 'Dutch Shepherd'),
  ('Dog', 'English Bulldog'),
  ('Dog', 'English Pointer'),
  ('Dog', 'French Bulldog'),
  ('Dog', 'German Shepherd Dog'),
  ('Dog', 'German Shorthaired Pointer'),
  ('Dog', 'Golden Retriever'),
  ('Dog', 'Great Dane'),
  ('Dog', 'Great Pyrenees'),
  ('Dog', 'Greyhound'),
  ('Dog', 'Irish Setter'),
  ('Dog', 'Irish Terrier'),
  ('Dog', 'Irish Wolfhound'),
  ('Dog', 'Jack Russell Terrier'),
  ('Dog', 'Jindo'),
  ('Dog', 'Labrador Retriever'),
  ('Dog', 'Leonberger'),
  ('Dog', 'Louisiana Catahoula Leopard Dog'),
  ('Dog', 'Maltese'),
  ('Dog', 'Mastiff'),
  ('Dog', 'Mountain Cur'),
  ('Dog', 'Newfoundland'),
  ('Dog', 'Papillon'),
  ('Dog', 'Parson Russell Terrier'),
  ('Dog', 'Pekingese'),
  ('Dog', 'Pembroke Welsh Corgi'),
  ('Dog', 'Perro de Presa Canario'),
  ('Dog', 'Pitbull'),
  ('Dog', 'Plott Hound'),
  ('Dog', 'Pomeranian'),
  ('Dog', 'Pug'),
  ('Dog', 'Rat Terrier'),
  ('Dog', 'Redbone Coonhound'),
  ('Dog', 'Rhodesian Ridgeback'),
  ('Dog', 'Rottweiler'),
  ('Dog', 'Saint Bernard'),
  ('Dog', 'Schnauzer'),
  ('Dog', 'Shar-Pei'),
  ('Dog', 'Shetland Sheepdog'),
  ('Dog', 'Shiba Inu'),
  ('Dog', 'Shih Tzu'),
  ('Dog', 'Siberian Husky'),
  ('Dog', 'Smooth Fox Terrier'),
  ('Dog', 'Staffordshire Bull Terrier'),
  ('Dog', 'Standard Poodle'),
  ('Dog', 'Treeing Walker Coonhound'),
  ('Dog', 'Vizsla'),
  ('Dog', 'Weimaraner'),
  ('Dog', 'Whippet'),
  ('Dog', 'Yorkshire Terrier'),
  ('Dog', 'Xoloitzcuintli'),
  ('Dog', 'Mixed Breed'),
  ('Dog', 'Other / Unknown'),
  ('Other', 'Bird'),
  ('Other', 'Hamster'),
  ('Other', 'Lizard'),
  ('Other', 'Mouse'),
  ('Other', 'Rabbit'),
  ('Other', 'Rat'),
  ('Other', 'Snake'),
  ('Other', 'Other');
