#include "Arduino.h"
#include <RGBLamp.h>
#include <Device.h>
#include <Lamp.h>
#include <Status.h>
#include <Converter.h>
#include <Util.h>
#include <HashMap.h>
#include <CommandValue.h>
#include <CmdValKeyHash.h>

RGBLamp::RGBLamp(int redPinNumber, int greenPinNumber, int bluePinNumber) : redPinNumber(redPinNumber), greenPinNumber(greenPinNumber), bluePinNumber(bluePinNumber){
    Component::name = "RGBLamp";
    this->redLamp = new Lamp(this->redPinNumber, true, 255);
    this->greenLamp = new Lamp(this->greenPinNumber, true, 255);
    this->blueLamp = new Lamp(this->bluePinNumber, true, 255);
}

void RGBLamp::giveCommand(Status status, HashMap<CommandValue, char*, 20, CmdValKeyHash> values){
    Converter converter;
    Util util;
    this->status = status;
    switch (status){
        /*case ON:
            turnOn();
            break;
        case OFF:
            turnOff();
            break;
        case PULSE:
            if(value != nullptr){
                float interval = converter.charArrToFloat(value);
                pulse(interval);               
            } else{
                pulse();
            }
            Serial.println("PULSE");
            break;
        case SET_BRIGHTNESS:
            if(value != nullptr){
                float brightness = converter.charArrToFloat(value);
                setBrightness(brightness);               
            }
            break;
        case SET_INTENSIVITY:
            if(value != nullptr){
                int intensivity = converter.charArrToInt(value, sizeof(value));
                setIntensivity(intensivity);               
            }
            break;
        case SET_COLOR:
             if(value != nullptr){
                
                int* colorValues = util.getRGBFromCharArr(value);
                if(sizeof(colorValues) >= 3)
                    setColor(colorValues[0], colorValues[1], colorValues[2]);               
            }
            break;*/
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