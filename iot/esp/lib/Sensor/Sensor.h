#ifndef SENSOR_H
#define SENSOR_H

#include "Component.h"
#include <WiFiMQTTConnector.h>

class Sensor : public Component{
protected:
    WiFiMQTTConnector* wifiMQTTConnector;
public:
    Sensor(WiFiMQTTConnector* wifiMQTTConnector);
    virtual void sendData() = 0;
};

#endif