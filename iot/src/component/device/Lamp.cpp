#include "Arduino.h"
#include "Lamp.h"
#include "Device.h"
#include "../Status.h"

Lamp::Lamp(int pinNumber) : pinNumber(pinNumber){
    Component::name = "Lamp";
}

void Lamp::turnOn(){
    if(status != ON){
        digitalWrite(pinNumber, HIGH);
        status = ON;
    }       
}

void Lamp::turnOff(){
    if(status != OFF){
        digitalWrite(pinNumber, LOW);
        status = OFF;
    }
    
}

void Lamp::pulse(float interval){
    if(status != PULSE)
        status = PULSE;
    //Can not see blinking if the inteval is below 20 ms
    if(interval < 20)
        interval = 20;

    digitalWrite(pinNumber, HIGH);
    delay(interval);
    digitalWrite(pinNumber, LOW);
    delay(interval);
}