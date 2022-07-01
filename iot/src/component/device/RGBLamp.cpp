#include "Arduino.h"
#include "RGBLamp.h"
#include "Device.h"
#include "Lamp.h"
#include "../Status.h"

RGBLamp::RGBLamp(int redPinNumber, int greenPinNumber, int bluePinNumber) : redPinNumber(redPinNumber), greenPinNumber(greenPinNumber), bluePinNumber(bluePinNumber){
    Component::name = "RGBLamp";
    this->redLamp = new Lamp(redPinNumber, true, 255);
    this->greenLamp = new Lamp(greenPinNumber, true, 255);
    this->blueLamp = new Lamp(bluePinNumber, true, 255);
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

void RGBLamp::setIntensivity(float intensivity, bool write){ 
    setRedIntensivity(intensivity, write); 
    setGreenIntensivity(intensivity, write);
    setBlueIntensivity(intensivity, write);
}
void RGBLamp::setRedIntensivity(float intensivity, bool write=false){ redLamp->setIntensivity(intensivity, write); }
void RGBLamp::setGreenIntensivity(float intensivity, bool write=false){ greenLamp->setIntensivity(intensivity, write); }
void RGBLamp::setBlueIntensivity(float intensivity, bool write=false){ blueLamp->setIntensivity(intensivity, write); }

void RGBLamp::setColor(float redIntensivity, float greenIntensivity, float blueIntensivity, bool write=false){
    setRedIntensivity(redIntensivity, write);
    setGreenIntensivity(greenIntensivity, write);
    setBlueIntensivity(blueIntensivity, write);
}