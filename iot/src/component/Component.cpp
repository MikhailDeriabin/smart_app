#include "Arduino.h"
#include "Component.h"

Component::Component(){
    this->name = "Component";
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

void Component::setPinMode(int pinNumbers[], int modeToSet){   
    int arrLength = sizeof(pinNumbers)/sizeof(*pinNumbers);
    for(int i=0; i<arrLength; i++){
        pinMode(pinNumbers[i], OUTPUT);
    }
}
