#include "Device.h"
#include "Component.h"
#include "Arduino.h"

Device::Device(int pinNumber) : Component(pinNumber){
    pinMode(pinNumber, OUTPUT);
}

char * Device::toString(){
    return "Device object";
}