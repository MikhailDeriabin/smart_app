#ifndef DHTSensor_H
#define DHTSensor_H

#include "Sensor.h"
#include "Adafruit_Sensor.h"
#include "DHT.h"
#include "WiFiMQTTConnector.h"

class DHTSensor : public Sensor{
private:
    DHT* dht;
    const int pinNumber;
public:
    DHTSensor(int pinNumber, WiFiMQTTConnector* wifiMQTTConnector);
    DHTSensor(int pinNumber, uint8_t updatingInterval, WiFiMQTTConnector* wifiMQTTConnector);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData() override;
    float getTemerature();
    float getHumidity();
};

#endif