#ifndef DHTSensor_H
#define DHTSensor_H

#include "Sensor.h"
#include "DHT.h"

class DHTSensor : public Sensor{
private:
    DHT* dht;
    const int pinNumber;
public:
    DHTSensor(int pinNumber);
    DHTSensor(int pinNumber, uint8_t updatingInterval);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData(char topic[]=nullptr, int topicSize=0) override;
    float getTemerature();
    float getHumidity();
};

#endif