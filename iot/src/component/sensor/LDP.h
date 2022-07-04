#ifndef LDP_H
#define LDP_H

#include "Sensor.h"

class LDP : public Sensor{
private:
    const int pinNumber;
public:
    LDP(int pinNumber);

    int getPinNumber();

    int getValue();
    bool isDark();
    bool isLight();
};

#endif