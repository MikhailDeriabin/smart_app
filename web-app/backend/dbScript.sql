SET FOREIGN_KEY_CHECKS=0;

INSERT INTO device_group (deviceGroup) VALUES ('lamps'), ('tvs'), ('sensors');

INSERT INTO room (room) VALUES ('kitchen'), ('bedroom'), ('washroom');


INSERT INTO status (id, status) VALUES (0, 'OFF'),(1, 'ON'),(2, 'PULSE'),
                                       (3, 'SET_BRIGHTNESS'),(4, 'SET_INTENSIVITY'),(5, 'SET_COLOR'),
                                       (6, 'SPIN_CLOCKWISE'),(7, 'SPIN_COUNTERCLOCKWISE'),(8, 'CHANGE_SPIN_DIRECTION'),
                                       (9, 'STOP_SPIN'),(10, 'MEASURE');

SET @status_id_OFF = 0;
SET @status_id_ON = 1;
SET @status_id_PULSE = 2;
SET @status_id_SET_BRIGHTNESS = 3;
SET @status_id_SET_INTENSIVITY = 4;
SET @status_id_SET_COLOR = 5;
SET @status_id_SPIN_CLOCKWISE = 6;
SET @status_id_SPIN_COUNTERCLOCKWISE = 7;
SET @status_id_CHANGE_SPIN_DIRECTION = 8;
SET @status_id_STOP_SPIN = 9;
SET @status_id_MEASURE = 10;

--Bosh
INSERT INTO manufacturer (manufacturer) VALUES('Bosh');
SET @manufacturer_bosh_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('lamp');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES (@type_id, @status_id_OFF),(@type_id, @status_id_ON);


INSERT IGNORE INTO type (type) VALUES ('stove');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_OFF),(@type_id, @status_id_ON),(@type_id, @status_id_PULSE),
                                                         (@type_id, @status_id_SET_BRIGHTNESS),(@type_id, @status_id_SET_COLOR);

--Huawei
INSERT INTO manufacturer (manufacturer) VALUES('Huawei');
SET @manufacturer_huawei_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('smartLamp');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_huawei_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_OFF),(@type_id, @status_id_ON),
                                                         (@type_id, @status_id_PULSE),(@type_id, @status_id_SET_BRIGHTNESS),(@type_id, @status_id_SET_COLOR);


--Create Devices

--Dumb lamp

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%Bosh%');
SET @statusId = (SELECT ID FROM status WHERE status='OFF');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%lamp%' AND type NOT LIKE '%smartLamp');


INSERT INTO device
(deviceName, deviceConsumption, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('dumbLamp1', 10, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);

--Smart lamp

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%Huawei%');
SET @statusId = (SELECT ID FROM status WHERE status='OFF');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%smartLamp%');

INSERT INTO device
(deviceName, deviceConsumption, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('smartLamp1', 10, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);