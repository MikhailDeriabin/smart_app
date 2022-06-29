#ifndef COMPONENT_H
#define COMPONENT_H

class Component{
protected:
    const int pinNumber;
    char* name;
public:
    Component(int pinNumber);

    int getPinNumber();
    char* getName();
    void setName(char name[]);
    virtual char* toString();
};

#endif