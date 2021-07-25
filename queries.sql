CREATE TABLE `3t0jhQo36v`.`Project` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(200) NOT NULL,
  `IsPublic` BIT NOT NULL DEFAULT true,
  `OwnerId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC));


CREATE TABLE `pivotal`.`Story` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `projectId` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200) NULL,
  `ownerId` INT NULL,
  `requesterId` INT NOT NULL,
  `points` INT NULL,
  `type` INT NULL,
  `state` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));