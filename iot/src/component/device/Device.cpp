#include "Device.h"
#include "../Component.h"
#include "Arduino.h"

Device::Device(int pinNumber) : Component(pinNumber){
    pinMode(pinNumber, OUTPUT);
    this->status = OFF;
    Component::name = "Device";
}