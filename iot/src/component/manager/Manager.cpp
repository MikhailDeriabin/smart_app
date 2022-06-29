#include "Manager.h"

Manager::Manager(int pinNumber) : Component(pinNumber){
    Component::name = "Manager";
}
Manager::Manager(int pinNumber, Component components[]) : Component(pinNumber){
    this->components = components;
    Component::name = "Manager";
}

Component* Manager::getComponents(){ return this->components; }
void Manager::setComponents(Component components[]){
    this->components = components;
}