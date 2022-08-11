#ifndef SENSOR_H
#define SENSOR_H

#include "Component.h"

class Sensor : public Component{
public:
    Sensor();
    virtual void sendData(char topic[]=nullptr, int topicSize=0) = 0;
};

#endif