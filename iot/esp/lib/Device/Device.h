#ifndef DEVICE_H
#define DEVICE_H

#include <Component.h>
#include <Status.h>

class Device : public Component{
public:
    Device();
    virtual void turnOn() = 0;
    virtual void turnOff() = 0;
};

#endif