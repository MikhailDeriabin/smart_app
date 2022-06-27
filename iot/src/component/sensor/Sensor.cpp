#include "Arduino.h"
#include "../Component.h"
#include "Sensor.h"

Sensor::Sensor(int pinNumber) : Component(pinNumber){
    pinMode(pinNumber, INPUT);
}

char * Sensor::toString(){
    return "Sensor object";
}