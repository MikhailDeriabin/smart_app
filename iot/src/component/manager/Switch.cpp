#include "Arduino.h"
#include "Switch.h"

Switch::Switch(int pinNumber) : pinNumber(pinNumber){
    Component::name = "Switch";
}

Switch::Switch(int pinNumber, Component components[]) : Manager(components), pinNumber(pinNumber){
    Component::name = "Switch";
}

bool Switch::isOn(){ 
    return digitalRead(pinNumber) == HIGH; 
}

bool Switch::isOff(){   
    return digitalRead(pinNumber) == LOW;
}