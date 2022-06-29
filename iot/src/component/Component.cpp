#include "Component.h"

Component::Component(int pinNumber) : pinNumber(pinNumber){
    pinNumber = pinNumber;
    this->name = "Component";
}

int Component::getPinNumber(){
    return pinNumber;
}

char* Component::getName(){
    return this->name;
}
void Component::setName(char name[]){
    this->name = name;
}

char* Component::toString(){
    return this->name;
}