SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `applications`;
DROP TABLE IF EXISTS `application_details`;
DROP TABLE IF EXISTS `emergency_contacts`;
DROP TABLE IF EXISTS `parents`;
DROP TABLE IF EXISTS `preference_info`;
DROP TABLE IF EXISTS `ece_info`;
DROP TABLE IF EXISTS `children`;
DROP TABLE IF EXISTS `caregivers`;
DROP TABLE IF EXISTS `documents`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(100) NOT NULL PRIMARY KEY,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `accountType` varchar(14) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  UNIQUE KEY `Username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `applications` (
  `id` varchar(100) PRIMARY KEY,
  `user_id` varchar(100) NOT NULL,
  `other_children` varchar(100) DEFAULT NULL,
  `use_of_info` tinyint(1) NOT NULL,
  `display_of_work` tinyint(1) NOT NULL,
  `photo_publication` tinyint(1) NOT NULL,
  `photo_publication_reason` varchar(100),
  `confirmation` tinyint(1) NOT NULL,
  CONSTRAINT FK_applications_users_id FOREIGN KEY (user_id)
  REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `children` (
  `id` varchar(100) PRIMARY KEY,
  `last_name` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `pref_name` varchar(100),
  `sex` tinyint(1) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `date_of_arrival` datetime NOT NULL,
  `country_of_birth` varchar(50) NOT NULL,
  `ethnic_origins` varchar(100),
  `iwi_affiliations` varchar(100),
  `languages` varchar(100),
  `first_language` varchar(30),
  CONSTRAINT FK_children_applications_id FOREIGN KEY (id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `parents` (
  `id` varchar(100) PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `relationship` varchar(100) NOT NULL,
  `country_of_birth` varchar(50) NOT NULL,
  `residential_address` varchar(100) NOT NULL,
  `postal_address` varchar(100),
  `home_phone` varchar(20),
  `cell_phone` varchar(20),
  `work_phone` varchar(20),
  `occupation` varchar(50),
  `employer` varchar(50),
  `contact_email` varchar(50),
  `marital_status` tinyint(10),
  `application_id` varchar(100),

  CONSTRAINT FK_parents_applications_id FOREIGN KEY (application_id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `caregivers` (
  `id` varchar(100) PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(20),
  CONSTRAINT FK_caregivers_applications_id FOREIGN KEY (id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `emergency_contacts` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `type` tinyint(10) NOT NULL,
  `phone` varchar(20),
  `application_id` varchar(100),
  CONSTRAINT FK_emergency_contacts_applications_id FOREIGN KEY (application_id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `application_details` (
  `id` varchar(100) PRIMARY KEY,
  `application_reason` varchar(1024) NOT NULL,
  `ses_referral` varchar(256),
  `previous_school` varchar(128),
  `previous_year_level` tinyint(26),
  `learning_support` varchar(128),
  `esol` tinyint(1) DEFAULT 0 NOT NULL,
  `learning_difficulties` varchar(128),
  `learning_disabilities` varchar(128),
  `behavioural_difficulties` varchar(128),
  `allergies` varchar(128),
  `medical_conditions` varchar(128),
  `medication` varchar(128),
  `custodial_access` varchar(128),
  `disciplinary_history` varchar(1024),
  `day_trip_perms` tinyint(1) DEFAULT 0 NOT NULL,
  CONSTRAINT FK_application_details_applications_id FOREIGN KEY (id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Storing Documents in DB not best practice but this is simple and small scale
CREATE TABLE IF NOT EXISTS `documents` (
  `id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100),
  `application_id` varchar(100),
  `type` tinyint(10),
  `document` mediumblob,
  CONSTRAINT FK_documents_applications_id FOREIGN KEY (application_id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `preference_info` (
  `id` varchar(100) PRIMARY KEY,
  `family_belief` tinyint(10),
  `father_belief` tinyint(10),
  `mother_belief` tinyint(10),
  `caregiver_belief` tinyint(10),
  `child_belief` tinyint(10),
  `church_info` varchar(128),
  CONSTRAINT FK_preference_info_applications_id FOREIGN KEY (id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `ece_info` (
  `id` varchar(100) PRIMARY KEY,
  `type` tinyint(10),
  `name` varchar(128),
  `hours` varchar(300),
  CONSTRAINT FK_ece_info_applications_id FOREIGN KEY (id)
  REFERENCES applications(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;