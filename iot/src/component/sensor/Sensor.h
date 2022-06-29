#ifndef SENSOR_H
#define SENSOR_H

#include "../Component.h"

class Sensor : public Component{
private:

public:
    Sensor(int pinNumber);
    virtual float getValue() = 0;
};

#endif