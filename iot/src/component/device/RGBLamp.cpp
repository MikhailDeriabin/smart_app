#include "Arduino.h"
#include "RGBLamp.h"
#include "Device.h"
#include "../Status.h"

RGBLamp::RGBLamp(int pinNumber) : pinNumber(pinNumber){
    Component::name = "RGBLamp";
}

void RGBLamp::turnOn(){     
}

void RGBLamp::turnOff(){ 
}

void RGBLamp::pulse(float interval){
}