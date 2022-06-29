#ifndef MANAGER_H
#define MANAGER_H

#include "../Component.h"

class Manager : public Component{
protected:
    Component* components;
public:
    Manager(int pinNumber);
    Manager(int pinNumber, Component components[]);
    Component* getComponents();
    void setComponents(Component components[]);
};

#endif