DROP DATABASE IF EXISTS simulator;
CREATE DATABASE simulator;
USE simulator;

CREATE TABLE Manufacturer(
    manufacturerName VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE Type(
    type VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE Status(
    status VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE AsTypeStatus(
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (type) REFERENCES Type(type),
    FOREIGN KEY (status) REFERENCES Status(status),
    PRIMARY KEY (type, status)
);

CREATE TABLE Device(
    deviceId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    powerConsumption DOUBLE DEFAULT 1,
    manufacturerName VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'OFF',
    FOREIGN KEY (manufacturerName) REFERENCES Manufacturer(manufacturerName),
    FOREIGN KEY (type) REFERENCES Type(type),
    FOREIGN KEY (status) REFERENCES Status(status)
);

INSERT INTO Manufacturer (manufacturerName) VALUES ('Xiaomi'), ('Nexa'), ('Roborock'), ('Garmin'), ('Bosch');
INSERT INTO Type (type) VALUES ('LAMP'), ('KATLE'), ('COOLING_FAN'), ('CAMERA');
INSERT INTO Status (status) VALUES ('ON'), ('OFF');
INSERT INTO asTypeStatus (type, status) VALUES ('LAMP', 'ON'), ('LAMP', 'OFF'), ('KATLE', 'ON'), ('KATLE', 'OFF'), ('COOLING_FAN', 'ON'), ('COOLING_FAN', 'OFF'), ('CAMERA', 'ON'), ('CAMERA', 'OFF');