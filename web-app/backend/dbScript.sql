SET FOREIGN_KEY_CHECKS=0;

INSERT INTO device_group (deviceGroup) VALUES ('lamps'), ('tvs'), ('sensors');

INSERT INTO room (room) VALUES ('kitchen'), ('bedroom'), ('washroom');


INSERT INTO status (status) VALUES ('on'),('off'),('25%'),('50%'),('75%');
SET @status_id_on = (SELECT ID FROM status WHERE status LIKE '%on%');
SET @status_id_off = (SELECT ID FROM status WHERE status LIKE '%off%');
SET @status_id_25 = (SELECT ID FROM status WHERE status LIKE '%25%%');
SET @status_id_50 = (SELECT ID FROM status WHERE status LIKE '%50%%');
SET @status_id_75 = (SELECT ID FROM status WHERE status LIKE '%75%%');



--Bosh
INSERT INTO manufacturer (manufacturer) VALUES('Bosh');
SET @manufacturer_bosh_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('lamp');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_on),(@type_id, @status_id_off);


INSERT IGNORE INTO type (type) VALUES ('stove');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_on),(@type_id, @status_id_off),(@type_id, @status_id_25),(@type_id, @status_id_50),(@type_id, @status_id_75);



--Huawei
INSERT INTO manufacturer (manufacturer) VALUES('Huawei');
SET @manufacturer_huawei_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('smartLamp');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_huawei_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_on),(@type_id, @status_id_off),(@type_id, @status_id_25),(@type_id, @status_id_50),(@type_id, @status_id_75);


--Create Devices

--Dumb lamp

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%Bosh%');
SET @statusId = (SELECT ID FROM status WHERE status LIKE '%off%');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%lamp%' AND type NOT LIKE '%smartLamp');


INSERT INTO device
(deviceName, deviceConsumption, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('dumbLamp1', 10, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);

--Smart lamp

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%Huawei%');
SET @statusId = (SELECT ID FROM status WHERE status LIKE '%off%');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%smartLamp%');

INSERT INTO device
(deviceName, deviceConsumption, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('smartLamp1', 10, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);


