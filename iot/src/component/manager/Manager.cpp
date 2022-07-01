#include "Arduino.h"
#include "Manager.h"
#include "../Status.h"

Manager::Manager(){ 
    this->status = OFF;
    Component::name = "Manager";
}
Manager::Manager(Component components[]){
    this->status = OFF;
    this->components = components;
    Component::name = "Manager";
}

Status Manager::getStatus(){ return this->status; }
void Manager::setStatus(Status status){ this->status = status; }

Component* Manager::getComponents(){ return this->components; }
void Manager::setComponents(Component components[]){ this->components = components; }