#include "Arduino.h"
#include <Component.h>
#include <Status.h>

Component::Component(){
    this->name = "Component";
    this->status = OFF;
}

int Component::getId(){ return this->id; }
void Component::setId(int id){ this->id = id; }
Status Component::getStatus(){ return this->status; }
void Component::setStatus(Status status){ this->status = status; }
char* Component::getName(){ return this->name; }
void Component::setName(char name[]){ this->name = name; }

char* Component::toString(){
    return this->name;
}

void Component::setPinMode(int pinNumbers[], int pinCount, int modeToSet){  
    for(int i=0; i<pinCount; i++){
        pinMode(pinNumbers[i], OUTPUT);
    }
}