#ifndef COMPONENT_H
#define COMPONENT_H

class Component{
protected:
    char* name;
    void setPinMode(int pinNumbers[], int modeToSet);
public:
    Component();
   
    char* getName();
    void setName(char name[]);
    virtual char* toString();
};

#endif