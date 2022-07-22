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
    Component::setPinMode(pins, OUTPUT);
    if(isPinAnalog){
        setIntensivity(intensivity);
        setBrightness(brightness);
    }       
}

void Lamp::giveCommand(Status status, char* value, int valueSize){
    Util util;
    Converter converter;
    this->status = status;
    //HashMap<CommandValue, char*, 20, CmdValKeyHash> valueMap = util.parseValueCharArrToMap(value, valueSize); 

    switch (status){
        case ON:
            Serial.println("ON");
            turnOn();
            break;
        case OFF:
            Serial.println("OFF");
            turnOff();
            break;
        case PULSE:
            Serial.println("PULSE");
            char* intervalValueRaw;
            /*
            if(valueMap.get(INTERVAL_MS, intervalValueRaw)){
                int intervalArrSize = intervalValueRaw[0] - '0';
                char intervalValue[intervalArrSize];
                util.splitCharArr(intervalValueRaw, intervalValue, 1, intervalArrSize-1);
                float interval = converter.charArrToFloat(intervalValue, intervalArrSize);

                Serial.print("intervalValueRaw ");
                Serial.println(intervalValueRaw);

                Serial.print("intervalArrSize ");
                Serial.println(intervalArrSize);

                Serial.print("intervalValue ");
                Serial.println(intervalValue);

                Serial.print("interval ");
                Serial.println(interval);

                pulse(interval);               
            } else{
                pulse();
            }*/
            break;
        case SET_BRIGHTNESS:
            /*if(value != nullptr){
                float brightness = converter.charArrToFloat(value);
                setBrightness(brightness);               
            }*/
            break;
        case SET_INTENSIVITY:
            /*if(value != nullptr){
                int intensivity = converter.charArrToInt(value, sizeof(value));
                setIntensivity(intensivity);               
            }  */
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