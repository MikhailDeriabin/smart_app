#include "Arduino.h"
#include <Status.h>
#include <Lamp.h>
#include <Device.h>
#include <Converter.h>
#include <Util.h>
#include <CommandValue.h>

Lamp::Lamp(int pinNumber, bool isPinAnalog, int intensivity, float brightness) : pinNumber(pinNumber), isPinAnalog(isPinAnalog){
    Component::name = "Lamp";
    int pins [] = {this->pinNumber};
    Component::setPinMode(pins, 1, OUTPUT);
    if(isPinAnalog){
        setIntensivity(intensivity);
        setBrightness(brightness);
    }       
}

void Lamp::giveCommand(Status status, char* valueStr, int valueStrSize){
    Util util;
    Converter converter;
    this->status = status;

    switch (status){
        case OFF:
            Serial.println("OFF");
            turnOff();
            break;

        case ON:
            Serial.println("ON");            
            turnOn();
            break;

        case PULSE:
            Serial.println("PULSE");
            if(valueStr != nullptr){
                float value = util.getFloatValueFromValueString(INTERVAL_MS, valueStr, valueStrSize);
                if(value != -1){
                    pulse(value);
                    break;
                }
            }

            pulse();
            break;

        case SET_BRIGHTNESS:
            Serial.println("SET_BRIGHTNESS");
            if(valueStr != nullptr){
                float value = util.getFloatValueFromValueString(LAMP_BRIGHTNESS, valueStr, valueStrSize);
                if(value != -1)
                    setBrightness(value, true);              
            }
            break;

        case SET_INTENSIVITY:
            Serial.println("SET_INTENSIVITY");
            if(valueStr != nullptr){
                int value = util.getIntValueFromValueString(LAMP_INTENSIVITY, valueStr, valueStrSize);
                if(value != -1)
                    setIntensivity(value, true);              
            }
            break;

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

void Lamp::increaseIntensivity(int intensivity, bool write){
    setIntensivity(this->intensivity + intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
void Lamp::decreaseIntensivity(int intensivity, bool write){
    setIntensivity(this->intensivity - intensivity);
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}

void Lamp::setIntensivity(int intensivity, bool write){ 
    this->intensivity = intensivity > 255 ? 255 : intensivity;
    this->intensivity = intensivity < 0 ? 0 : intensivity;
    this->intensivity = intensivity; 
    if(write)
        analogWrite(pinNumber, this->intensivity*brightness);
}
int Lamp::getIntensivity(){ return this->intensivity; }

void Lamp::setBrightness(float brightness, bool write){
    brightness = brightness > 1 ? 1 : brightness;
    brightness = brightness < 0 ? 0 : brightness;
    this->brightness = brightness;
    if(write)
        analogWrite(pinNumber, intensivity*this->brightness);
}
float Lamp::getBrightness(){ return this->brightness; }