#ifndef LAMP_H
#define LAMP_H

#include "Device.h"

class Lamp : public Device{
private:

public:
    Lamp(int pinMode);

    void pulse(float interval);
    void turnOn() override;
    void turnOff() override;
};

#endif