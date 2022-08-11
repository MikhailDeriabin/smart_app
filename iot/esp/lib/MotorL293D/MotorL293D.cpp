#include "Arduino.h"
#include "MotorL293D.h"
#include <Converter.h>
#include <Util.h>
#include "Status.h"
#include <CommandValue.h>

MotorL293D::MotorL293D(int enablePin, int input1Pin, int input2Pin) : enablePin(enablePin), input1Pin(input1Pin), input2Pin(input2Pin){
    int pins[] = {enablePin, input1Pin, input2Pin};
    Component::setPinMode(pins, 3, OUTPUT);
    Component::name = "MotorL293D";
    for(int pin : pins){
        digitalWrite(pin, LOW);
    }
    this->direction = CLOCKWISE;  
    this->status = OFF;
}

void MotorL293D::giveCommand(Status status, char* valueStr, int valueStrSize){
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
            turnOn(true);
            break;

        case SPIN_CLOCKWISE:
            Serial.println("SPIN_CLOCKWISE");            
            spinClock();
            break;

        case SPIN_COUNTERCLOCKWISE:
            Serial.println("SPIN_COUNTERCLOCKWISE");            
            spinCounter();
            break;

        case CHANGE_SPIN_DIRECTION:
            Serial.println("CHANGE_SPIN_DIRECTION");            
            changeDirection();
            break;

        default:
            break;
    }
}

void MotorL293D::turnOn(bool start){
    digitalWrite(enablePin, HIGH); 
    status = ON;

    if(start)
        startSpin();
}
void MotorL293D::turnOff(){
    digitalWrite(enablePin, LOW);
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, LOW); 
    status = OFF;
    stopSpin();
}

void MotorL293D::startSpin(){
    if(status == OFF)
        turnOn();

    if(direction == CLOCKWISE)
        spinClock();
    else if(direction == COUNTERCLOCKWISE)
        spinCounter();
}
void MotorL293D::stopSpin(){
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, LOW); 
    status = STOP_SPIN;
}

void MotorL293D::changeDirection(){
    if(status == OFF)
        turnOn();

    if(direction == CLOCKWISE){
        stopSpin();
        delay(50);
        spinCounter();
    }
        
    else if(direction == COUNTERCLOCKWISE){
        stopSpin();
        delay(50);
        spinClock();
    }                   
}
void MotorL293D::spinClock(){
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, HIGH); 
    status = SPIN_CLOCKWISE;
    direction = CLOCKWISE;
}
void MotorL293D::spinCounter(){
    digitalWrite(input1Pin, HIGH);
    digitalWrite(input2Pin, LOW); 
    status = SPIN_COUNTERCLOCKWISE;
    direction = COUNTERCLOCKWISE;
}

Status MotorL293D::getStatus(){ return this->status; }