#include "Arduino.h"
#include "RGBLamp.h"
#include "Device.h"
#include "Lamp.h"
#include "../Status.h"
#include "../util/Converter.h"
#include "../util/Util.h"

Converter converter;
Util util;

RGBLamp::RGBLamp(int redPinNumber, int greenPinNumber, int bluePinNumber) : redPinNumber(redPinNumber), greenPinNumber(greenPinNumber), bluePinNumber(bluePinNumber){
    Component::name = "RGBLamp";
    this->redLamp = new Lamp(this->redPinNumber, true, 255);
    this->greenLamp = new Lamp(this->greenPinNumber, true, 255);
    this->blueLamp = new Lamp(this->bluePinNumber, true, 255);
}

void RGBLamp::giveCommand(Status status, char value[]=NULL){
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
        case SET_COLOR:
             if(value != NULL){
                int* colorValues = util.getRGBFromCharArr(value);
                if(sizeof(colorValues) >= 3)
                    setColor(colorValues[0], colorValues[1], colorValues[2]);               
            }
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

void RGBLamp::pulse(float interval=1000){
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
void RGBLamp::setRedIntensivity(int intensivity, bool write=false){ redLamp->setIntensivity(intensivity, write); }
void RGBLamp::setGreenIntensivity(int intensivity, bool write=false){ greenLamp->setIntensivity(intensivity, write); }
void RGBLamp::setBlueIntensivity(int intensivity, bool write=false){ blueLamp->setIntensivity(intensivity, write); }

void RGBLamp::setColor(int redIntensivity, int greenIntensivity, int blueIntensivity, bool write=false){
    setRedIntensivity(redIntensivity, write);
    setGreenIntensivity(greenIntensivity, write);
    setBlueIntensivity(blueIntensivity, write);
}
 void RGBLamp::setBrightness(float brightness, bool write=false){
    redLamp->setBrightness(brightness, write);
    greenLamp->setBrightness(brightness, write);
    blueLamp->setBrightness(brightness, write);
 }