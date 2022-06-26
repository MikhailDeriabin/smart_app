#include "Component.h"

Component::Component(int pinNumber) : pinNumber(pinNumber){
    pinNumber = pinNumber;
}

int Component::getPinNumber(){
    return pinNumber;
}

char * Component::toString(){
    return "Component object";
}