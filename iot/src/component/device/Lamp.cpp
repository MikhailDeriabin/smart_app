#include "Lamp.h"
#include "Device.h"
#include "Arduino.h"

Lamp::Lamp(int pinMode) : Device(pinMode){}

void Lamp::turnOn(){
    if(!isOn){
        digitalWrite(pinNumber, HIGH);
        isOn = true;
    }       
}

void Lamp::turnOff(){
    if(isOn){
        digitalWrite(pinNumber, LOW);
        isOn = false;
    }
    
}

void Lamp::pulse(float interval){
    //Can not see blinking if the inteval is below 20
    if(interval < 20)
        interval = 20;

    turnOn();
    delay(interval);
    turnOff();
    delay(interval);
}