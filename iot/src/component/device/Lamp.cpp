#include "Arduino.h"
#include "Lamp.h"
#include "Device.h"
#include "../Status.h"

Lamp::Lamp(int pinNumber, bool isPinAnalog=false, uint8_t intensivity=255, float brightness=1) : pinNumber(pinNumber), isPinAnalog(isPinAnalog){
    Component::name = "Lamp";
    int pins [] = {this->pinNumber};
    Component::setPinMode(pins, OUTPUT);
    if(isPinAnalog){
        setIntensivity(intensivity);
        setBrightness(brightness);
    }       
}

void Lamp::turnOn(){
    if(!isPinAnalog)
        digitalWrite(pinNumber, HIGH);
    else
        analogWrite(pinNumber, intensivity*brightness);

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

void Lamp::increaseIntensivity(uint8_t intensivity, bool write=false){
    setIntensivity(this->intensivity + intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
void Lamp::decreaseIntensivity(uint8_t intensivity, bool write=false){
    setIntensivity(this->intensivity - intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}

void Lamp::setIntensivity(uint8_t intensivity, bool write=false){ 
    this->intensivity = intensivity > 255 ? 255 : intensivity;
    this->intensivity = intensivity < 0 ? 0 : intensivity;
    this->intensivity = intensivity; 
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
uint8_t Lamp::getIntensivity(){ return this->intensivity; }

void Lamp::setBrightness(float brightness, bool write=false){
    brightness = brightness > 1 ? 1 : brightness;
    brightness = brightness < 0 ? 0 : brightness;
    this->brightness = brightness;
    if(write)
        analogWrite(pinNumber, intensivity*this->brightness);
}
float Lamp::getBrightness(){ return this->brightness; }