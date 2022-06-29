#ifndef DEVICE_H
#define DEVICE_H

#include "../Component.h"
#include "../Status.h"

class Device : public Component{
protected:
    Status status;
public:
    Device(int pinNumber);
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
    Status getStatus();
    void setStatus(Status status);
};

#endif