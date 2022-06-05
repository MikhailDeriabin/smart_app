DROP DATABASE IF EXISTS smartApp;
CREATE DATABASE smartApp;
USE smartApp;

CREATE TABLE Manufacturer(
    manufacturerName VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE Type(
    type VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE Status(
    status VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE asTypeStatus(
    type VARCHAR(255) NOT NULL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (type) REFERENCES Type(type),
    FOREIGN KEY (status) REFERENCES Status(status)
);

CREATE TABLE Device(
    id INT NOT NULL PRIMARY KEY,
    powerConsumption DOUBLE DEFAULT 1,
    manufacturerName VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) DEFAULT 'OFF',
    FOREIGN KEY (manufacturerName) REFERENCES Manufacturer(manufacturerName),
    FOREIGN KEY (type) REFERENCES Type(type),
    FOREIGN KEY (status) REFERENCES Status(status)
);

INSERT INTO Manufacturer (manufacturerName) VALUES ('Xiaomi'), ('Nexa'), ('Roborock'), ('Garmin'), ('Bosch');
INSERT INTO Type (type) VALUES ('lamp'), ('katle'), ('cooling_fan'), ('camera');
INSERT INTO Status (status) VALUES ('ON'), ('OFF');