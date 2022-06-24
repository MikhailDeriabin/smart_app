#ifndef DEVICE_H
#define DEVICE_H

#include "Component.h"

class Device : public Component{

public:
    Device(int pinNumber, char name[]) : Component(pinNumber, name){

    }

};

#endif