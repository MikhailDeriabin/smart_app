#include "Lamp.h"
#include "Device.h"
#include "Arduino.h"

Lamp::Lamp(int pinMode) : Device(pinMode){}

void Lamp::turnOn(){
    digitalWrite(pinNumber, HIGH);
}

void Lamp::turnOff(){
    digitalWrite(pinNumber, LOW);
}

void Lamp::pulse(float interval){
    turnOn();
    delay(interval);
    turnOff();
    delay(interval);
}