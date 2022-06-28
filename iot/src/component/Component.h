#ifndef COMPONENT_H
#define COMPONENT_H

class Component{
protected:
    const int pinNumber;
public:
    Component(int pinNumber);

    virtual char * toString();
    int getPinNumber();
};

#endif