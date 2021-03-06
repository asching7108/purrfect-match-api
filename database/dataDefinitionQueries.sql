DROP TABLE IF EXISTS `UserPet`;
DROP TABLE IF EXISTS `UserPreference`;
DROP TABLE IF EXISTS `PetNewsItem`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Pet`;
DROP TABLE IF EXISTS `Shelter`;
DROP TABLE IF EXISTS `PetBreed`;


-- Create Shelter table
CREATE TABLE `Shelter` (
 `ShelterID` int not null AUTO_INCREMENT,
 `ShelterName` varchar(255) not null,
 `Address` varchar(100) not null,
 `EmailAddress` varchar(100) not null,
 `Password` varchar(100) not null,
 `PhoneNumber` varchar(10) not null,
 `Website` varchar(255),
 `LastUpdated` datetime not null,
  PRIMARY KEY (`ShelterID`),
  CONSTRAINT UNIQUE (`Address`,`EmailAddress`,`PhoneNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Create Pet table
CREATE TABLE `Pet` (
 `PetID` int not null AUTO_INCREMENT,
 `Name` varchar(255),
 `TypeOfAnimal` varchar(100) not null,
 `Breed` varchar(100) not null,
 `Sex` varchar(100) not null,
 `Age` int,
 `Size` varchar(100) not null,
 `ShelterID` int not null,
 `Picture` varchar(255) not null,
 `Availability` varchar(100) not null,
 `Description` text not null,
 `LastUpdated` datetime not null,
 `GoodWithOtherAnimals` boolean not null,
 `GoodWithChildren` boolean not null,
 `MustBeLeashed` boolean not null,
 `Neutered` boolean not null,
 `Vaccinated` boolean not null,
 `HouseTrained` boolean not null, 
  PRIMARY KEY (`PetID`),
  CONSTRAINT `ShelterID_fk` FOREIGN KEY (`ShelterID`) REFERENCES `Shelter` (`ShelterID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Create `User` table
CREATE TABLE `User` (
 `UserID` int not null AUTO_INCREMENT,
 `FirstName` varchar(100) not null,
 `LastName` varchar(100) not null,
 `EmailAddress` varchar(100) not null,
 `Password` varchar(100) not null,
 `ZipCode` int not null,
 `LastUpdated` datetime not null,
  PRIMARY KEY (`UserID`),
  CONSTRAINT UNIQUE (`EmailAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Create `PetNewsItem` table
CREATE TABLE `PetNewsItem` (
 `NewsItemID` int not null AUTO_INCREMENT,
 `PetID` int not null,
 `NewsItem` text not null,
 `DatePosted` datetime not null,
  PRIMARY KEY (`NewsItemID`),
  CONSTRAINT `PetID_fk` FOREIGN KEY (`PetID`) REFERENCES `Pet` (`PetID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Create `UserPreference` table
CREATE TABLE `UserPreference` (
 `UserPreferenceID` int not null AUTO_INCREMENT,
 `UserID` int not null,
 `TypeOfAnimal` varchar(255),
 `Breed` varchar(100),
 `Sex` varchar(100),
 `MinAge` int,
 `MaxAge` int,
 `More` varchar(255),
 `Distance` varchar(100),
 `ZipCode` int,
  PRIMARY KEY (`UserPreferenceID`),
  CONSTRAINT `UserID_fk` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Create `UserPet` table
CREATE TABLE `UserPet` (
 `UserID` int not null,
 `PetID` int not null,
  CONSTRAINT `UserID_fk2` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE,
  CONSTRAINT `PetID_fk2` FOREIGN KEY (`PetID`) REFERENCES `Pet` (`PetID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Create PetBreed table
CREATE TABLE `PetBreed` (
 `TypeOfAnimal` varchar(100) not null,
 `Breed` varchar(100) not null,
  PRIMARY KEY (`TypeOfAnimal`, `Breed`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
