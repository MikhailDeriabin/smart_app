#include "Arduino.h"
#include <RGBLamp.h>
#include <Device.h>
#include <Lamp.h>
#include <Status.h>
#include <Converter.h>
#include <Util.h>
#include <CommandValue.h>

RGBLamp::RGBLamp(int redPinNumber, int greenPinNumber, int bluePinNumber) : redPinNumber(redPinNumber), greenPinNumber(greenPinNumber), bluePinNumber(bluePinNumber){
    Component::name = "RGBLamp";
    this->redLamp = new Lamp(this->redPinNumber, true, 255);
    this->greenLamp = new Lamp(this->greenPinNumber, true, 255);
    this->blueLamp = new Lamp(this->bluePinNumber, true, 255);
}

void RGBLamp::giveCommand(Status status, char* valueStr, int valueStrSize){
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

        case SET_COLOR:
            Serial.println("SET_COLOR");
            if(valueStr != nullptr){
                int red = util.getIntValueFromValueString(RED_COLOR, valueStr, valueStrSize);
                int green = util.getIntValueFromValueString(GREEN_COLOR, valueStr, valueStrSize);
                int blue = util.getIntValueFromValueString(BLUE_COLOR, valueStr, valueStrSize);
                if(red != -1) setRedIntensivity(red, true);
                if(green != -1) setGreenIntensivity(green, true);
                if(blue != -1) setBlueIntensivity(blue, true);              
            }
            break;

        default:
            break;
    }
}

void RGBLamp::turnOn(){  
    redLamp->turnOn();  
    greenLamp->turnOn();
    blueLamp->turnOn(); 
}

void RGBLamp::turnOff(){ 
    redLamp->turnOff();  
    greenLamp->turnOff();
    blueLamp->turnOff();
}

void RGBLamp::pulse(float interval){
    //Can not see blinking if the inteval is below 20 ms
    if(interval < 20)
        interval = 20;

    turnOn();
    delay(interval);
    turnOff();
    delay(interval);
}

void RGBLamp::setIntensivity(int intensivity, bool write){ 
    setRedIntensivity(intensivity, write); 
    setGreenIntensivity(intensivity, write);
    setBlueIntensivity(intensivity, write);
}
void RGBLamp::setRedIntensivity(int intensivity, bool write){ redLamp->setIntensivity(intensivity, write); }
void RGBLamp::setGreenIntensivity(int intensivity, bool write){ greenLamp->setIntensivity(intensivity, write); }
void RGBLamp::setBlueIntensivity(int intensivity, bool write){ blueLamp->setIntensivity(intensivity, write); }

void RGBLamp::setColor(int redIntensivity, int greenIntensivity, int blueIntensivity, bool write){
    setRedIntensivity(redIntensivity, write);
    setGreenIntensivity(greenIntensivity, write);
    setBlueIntensivity(blueIntensivity, write);
}
 void RGBLamp::setBrightness(float brightness, bool write){
    redLamp->setBrightness(brightness, write);
    greenLamp->setBrightness(brightness, write);
    blueLamp->setBrightness(brightness, write);
 }