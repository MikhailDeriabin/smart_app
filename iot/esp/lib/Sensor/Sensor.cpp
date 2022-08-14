#include "Component.h"
#include "Sensor.h"
#include "WiFiMQTTConnector.h"

Sensor::Sensor(WiFiMQTTConnector* wifiMQTTConnector) {
    Component::name = "Sensor";
    this->wifiMQTTConnector = wifiMQTTConnector;
}