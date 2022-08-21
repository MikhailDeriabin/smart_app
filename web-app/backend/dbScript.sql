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
INSERT INTO manufacturer (manufacturer) VALUES('BOSH');
SET @manufacturer_bosh_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('LAMP');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES (@type_id, @status_id_OFF),(@type_id, @status_id_ON),
                                                          (@type_id, @status_id_PULSE),(@type_id, @status_id_SET_BRIGHTNESS),(@type_id, @status_id_SET_INTENSIVITY);


INSERT IGNORE INTO type (type) VALUES ('RGB_LAMP');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_bosh_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_OFF),(@type_id, @status_id_ON),(@type_id, @status_id_PULSE),
                                                         (@type_id, @status_id_SET_BRIGHTNESS),(@type_id, @status_id_SET_INTENSIVITY),(@type_id, @status_id_SET_COLOR);

--BEST_ALI
INSERT INTO manufacturer (manufacturer) VALUES('BEST_ALI');
SET @manufacturer_best_ali_id = LAST_INSERT_ID();

INSERT IGNORE INTO type (type) VALUES ('MOTOR_L293D');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_best_ali_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_OFF),(@type_id, @status_id_ON),
                                                         (@type_id, @status_id_SPIN_CLOCKWISE),(@type_id, @status_id_SPIN_COUNTERCLOCKWISE),(@type_id, @status_id_CHANGE_SPIN_DIRECTION);


INSERT IGNORE INTO type (type) VALUES ('DHT_SENSOR');
SET @type_id = LAST_INSERT_ID();
INSERT INTO manufacturer_types_type (manufacturerId,typeId) VALUES(@manufacturer_best_ali_id, @type_id);

INSERT INTO type_statuses_status (typeId,statusId) VALUES(@type_id, @status_id_OFF)(@type_id, @status_id_MEASURE);





--Create Devices

--LAMP

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%BOSH%');
SET @statusId = (SELECT ID FROM status WHERE status='OFF');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%LAMP%' AND type NOT LIKE '%RGB_LAMP');


INSERT INTO device
(deviceName, deviceConsumption,bordId,created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('LAMP_1', 10,1, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);

--RGB_LAMP

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%BOSH%');
SET @statusId = (SELECT ID FROM status WHERE status='OFF');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%RGB_LAMP%');

INSERT INTO device
(deviceName, deviceConsumption,bordId, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('RGB_LAMP_1', 10, 1, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);


--MOTOR_L293D

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%BEST_ALI%');
SET @statusId = (SELECT ID FROM status WHERE status='OFF');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%MOTOR_L293D%');

INSERT INTO device
(deviceName, deviceConsumption,bordId, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('MOTOR_L293D_1', 10, 1, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);


--DHT_SENSOR

SET @manufacturerId = (SELECT ID FROM manufacturer WHERE manufacturer LIKE '%BEST_ALI%');
SET @statusId = (SELECT ID FROM status WHERE status='MEASURE ');
SET @typeId = (SELECT ID FROM type WHERE type LIKE '%MOTOR_L293D%');

INSERT INTO device
(deviceName, deviceConsumption,bordId, created, updated, manufacturerId, statusId, typeId, deviceGroupId, roomId)
VALUES('DHT_SENSOR_1', 10, 1, current_timestamp(6), current_timestamp(6), @manufacturerId, @statusId, @typeId, NULL, NULL);


