#ifndef SWITCH_H
#define SWITCH_H

#include "Manager.h"

class Switch : public Manager{
public:
    Switch(int pinNumber);
    Switch(int pinNumber, Component components[]);

    bool isOn();
    bool isOff();

};

#endif