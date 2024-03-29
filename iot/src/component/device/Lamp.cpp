#include "Arduino.h"
#include "Lamp.h"
#include "Device.h"
#include "../Status.h"
#include "../util/Converter.h"

Converter converter;

Lamp::Lamp(int pinNumber, bool isPinAnalog=false, int intensivity=255, float brightness=1) : pinNumber(pinNumber), isPinAnalog(isPinAnalog){
    Component::name = "Lamp";
    int pins [] = {this->pinNumber};
    Component::setPinMode(pins, OUTPUT);
    if(isPinAnalog){
        setIntensivity(intensivity);
        setBrightness(brightness);
    }       
}

void Lamp::giveCommand(Status status, char value[]=NULL){
    this->status = status;
    switch (status){
        case ON:
            turnOn();
        case OFF:
            turnOff();
        case PULSE:
            if(value != NULL){
                float interval = converter.charArrToFloat(value);
                pulse(interval);               
            } else{
                pulse();
            }
        case SET_BRIGHTNESS:
            if(value != NULL){
                float brightness = converter.charArrToFloat(value);
                setBrightness(brightness);               
            }
        case SET_INTENSIVITY:
            if(value != NULL){
                int intensivity = converter.charArrToInt(value);
                setIntensivity(intensivity);               
            }  
        default:
            break;
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

void Lamp::pulse(float interval=1000){
    //Can not see blinking if the inteval is below 20 ms
    if(interval < 20)
        interval = 20;

    turnOn();
    delay(interval);
    turnOff();
    delay(interval);
    status = PULSE;
}

void Lamp::increaseIntensivity(int intensivity, bool write=false){
    setIntensivity(this->intensivity + intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
void Lamp::decreaseIntensivity(int intensivity, bool write=false){
    setIntensivity(this->intensivity - intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}

void Lamp::setIntensivity(int intensivity, bool write=false){ 
    this->intensivity = intensivity > 255 ? 255 : intensivity;
    this->intensivity = intensivity < 0 ? 0 : intensivity;
    this->intensivity = intensivity; 
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
int Lamp::getIntensivity(){ return this->intensivity; }

void Lamp::setBrightness(float brightness, bool write=false){
    brightness = brightness > 1 ? 1 : brightness;
    brightness = brightness < 0 ? 0 : brightness;
    this->brightness = brightness;
    if(write)
        analogWrite(pinNumber, intensivity*this->brightness);
}
float Lamp::getBrightness(){ return this->brightness; }