#ifndef MANAGER_H
#define MANAGER_H

#include "../Component.h"
#include "../Status.h"

class Manager : public Component{
protected:
    Status status;
    Component* components;
public:
    Manager();
    Manager(Component components[]);

    Status getStatus();
    void setStatus(Status status);
    Component* getComponents();
    void setComponents(Component components[]);
};

#endif