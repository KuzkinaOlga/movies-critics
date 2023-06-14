-- MySQL Script generated by MySQL Workbench
-- Wed Jun 14 14:39:54 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema moviecrit
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema moviecrit
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `moviecrit` DEFAULT CHARACTER SET utf8 ;
USE `moviecrit` ;

-- -----------------------------------------------------
-- Table `moviecrit`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviecrit`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviecrit`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviecrit`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `movies_details` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_post_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `moviecrit`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `moviecrit`.`user_post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `moviecrit`.`user_post` (
  `liked` TINYINT NOT NULL,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `fk_user_post_post1_idx` (`post_id` ASC) VISIBLE,
  PRIMARY KEY (`post_id`, `user_id`),
  INDEX `fk_user_post_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_post_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `moviecrit`.`post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `moviecrit`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;