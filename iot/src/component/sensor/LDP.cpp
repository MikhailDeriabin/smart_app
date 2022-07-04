#include "Arduino.h"
#include "LDP.h"

//Note: isDark and isLight methods may not be valid for different LDP sensors and setups
LDP::LDP(int pinNumber) : pinNumber(pinNumber){
    Component::name = "LDP";
    int pins[] = { pinNumber };
    Component::setPinMode(pins, INPUT);
}

int LDP::getPinNumber(){ return this->pinNumber; }

int LDP::getValue(){ return analogRead(pinNumber); }
bool LDP::isDark(){ return analogRead(pinNumber) >= 400; }
bool LDP::isLight(){ return analogRead(pinNumber) < 400; }