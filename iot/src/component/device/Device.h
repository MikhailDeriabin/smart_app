#ifndef DEVICE_H
#define DEVICE_H

#include "../Component.h"

class Device : public Component{

public:
    Device(int pinNumber);
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
    char * toString() override;
};

#endif