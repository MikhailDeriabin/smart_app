#include "Arduino.h"
#include "Lamp.h"
#include "Device.h"
#include "../Status.h"

Lamp::Lamp(int pinNumber) : pinNumber(pinNumber), isPinAnalog(false){
    Component::name = "Lamp";
    int pins [] = {pinNumber};
    Component::setPinMode(pins, OUTPUT);
}

Lamp::Lamp(int pinNumber, bool isPinAnalog) : pinNumber(pinNumber), isPinAnalog(isPinAnalog){
    Component::name = "Lamp";
    int pins [] = {pinNumber};
    Component::setPinMode(pins, OUTPUT);
    if(isPinAnalog)
        this->intensivity = 255;
}

Lamp::Lamp(int pinNumber, bool isPinAnalog, float intensivity) : pinNumber(pinNumber), isPinAnalog(isPinAnalog){
    Component::name = "Lamp";
    int pins [] = {pinNumber};
    Component::setPinMode(pins, OUTPUT);
    if(isPinAnalog)
        this->intensivity = intensivity;
}

void Lamp::turnOn(){
    if(!isPinAnalog)
        digitalWrite(pinNumber, HIGH);
    else
        analogWrite(pinNumber, intensivity);

    this->status = ON;       
}

void Lamp::turnOff(){    
    if(!isPinAnalog)
        digitalWrite(pinNumber, LOW);
    else
        analogWrite(pinNumber, 0);
        
    this->status = OFF;    
}

void Lamp::pulse(float interval){
    //Can not see blinking if the inteval is below 20 ms
    if(interval < 20)
        interval = 20;

    turnOn();
    delay(interval);
    turnOff();
    delay(interval);
    status = PULSE;
}

void Lamp::increaseIntensivity(float intensivity, bool write=false){
    setIntensivity(this->intensivity + intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity);
}
void Lamp::decreaseIntensivity(float intensivity, bool write=false){
    setIntensivity(this->intensivity - intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity);
}

void Lamp::setIntensivity(float intensivity, bool write=false){ 
    intensivity = intensivity > 255 ? 255 : intensivity;
    intensivity = intensivity < 0 ? 0 : intensivity;
    this->intensivity = intensivity; 
    if(write)
        analogWrite(pinNumber, this->intensivity);
}
float Lamp::getIntensivity(){ return this->intensivity; }