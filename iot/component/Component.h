#ifndef COMPONENT_H
#define COMPONENT_H

class Component{
protected:
    const int pinNumber;
    char name[];
public:
    Component(int pinNumber, char name[]) : pinNumber(pinNumber){
        pinNumber = pinNumber;
    }

    virtual char * toString();
};

#endif