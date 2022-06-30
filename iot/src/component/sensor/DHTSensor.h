#ifndef DHTSensor_H
#define DHTSensor_H

#include "Sensor.h"
#include "DHT.h"

class DHTSensor : public Sensor{
    private:
     DHT* dht;
public:
    DHTSensor(int pinNumber);
    DHTSensor(int pinNumber, uint8_t updatingInterval);
    float getTemerature();
    float getHumidity();
};

#endif