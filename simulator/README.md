# Simulator of IoT devices

## Getting started

1. In the simulator folder open .env file and write right values for your DB:
* DATABASE name of the DB, by default simulator, but you wish to change that name, remember to change it in the DBScript as well
* DATABASE_DIALECT dialect of the DB, by default mariadb, used only by Sequelize ORM. mysql is also ok.
* DATABASE_HOST host name of the DB
* DATABASE_PORT port number of the DB
* DATABASE_USER username of the DB
* DATABASE_PASSWORD password of the username DB

2. Remember do not commit the .env file, otherwise it could cause conflicts

4. Open your DB console and paste the DBScript.sql(simulator folder) code

6. Open terminal in the IDE and run the command node .\simulator\backend\server.js (or node .\backend\server.js if you are in simulator folder already)

8. Open some of the html files(simulator/frontend/html folder) in the browser on server:
In the Webstorm:
* Right click on the html file
* Open In
* Browser
* Choose preferred browser
In Visio Studio Code and other: https://www.youtube.com/watch?v=nx8E5BF0XuE

## Key words
* status - device status or what device may do, for example ON, OFF etc.
* type - type of the device, for example lamp, katle etc.

## Tabs descriptions
### Simulator
Simulator of the IoT devices. It shows current statuses of the devices. There is no auto update, so update page manually after changing device status via API

### Devices
Exsisting devices and functionality for adding a new one, updating or removing device

### Types
Added types of the devices. Also for each type should be determined possible statuses. For example for lamp it may be ON, OFF and for fridge it may be ON, OFF, FREEZE

### Statuses
Added statuses of the devices. Also for each status should be determined possible types. For example for OFF it may be lamp, fridge and for FREEZE it can be fridge only

## API description
| Action | Path | Method | Request body example | Response example | Possible responses |
| -------- | ---- | ----- | ----- | ----- | ----- |
| Create a new device | /api/device | POST | { "powerConsumption": 700, "manufacturerName": "Bosch", "type": "KATLE", "status" : "OFF" } | { "deviceId": 2, "powerConsumption": 700, "manufacturerName": "Bosch", "type": "KATLE", "status": "OFF" } | object with the created device data, null - error |
| Change a device status | /api/device | PUT | { deviceId: 1, status: 'ON' } | true | true - updated, false - not updated(already was this status), null - error |
| Get all devices data | /api/device | GET | ----- | [ { "deviceId": 1, "powerConsumption": 700, "manufacturerName": "Bosch", "type": "KATLE", "status": "OFF" } ] | array with objects with device data, null - error |
| Get a device by id | /api/device/:deviceId | GET | ----- | { "deviceId": 1, "powerConsumption": 700, "manufacturerName": "Bosch", "type": "KATLE", "status": "OFF" } | object with the device data, null - error |
| Delete a device by id | /api/device/:deviceId | DELETE | ----- | true | true - deleted, false - not deleted (did not exist or already was deleted) |

## DB diagrams
* ER diagram
![DB ER diagram](https://github.com/MikhailDeriabin/smart_app/blob/master/simulator/doc_img/ER_diagram.png)

* Relational schema
![DB relational diagram](https://github.com/MikhailDeriabin/smart_app/blob/master/simulator/doc_img/Rel_diagram.png)
