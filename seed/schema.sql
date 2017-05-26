CREATE DATABASE beer_db;
USE beer_db;

CREATE TABLE `users` (

  -- TABLE CODE TO GO HERE
  	id int NOT NULL AUTO_INCREMENT,
	username varchar(30) not null,
    pssword varchar(30) not null,
    email varchar(50) not null,
    realname varchar(30) not null,
	time_created datetime NOT NULL DEFAULT NOW(), 
	PRIMARY KEY (id)

);