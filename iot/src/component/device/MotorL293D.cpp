#include "Arduino.h"
#include "MotorL293D.h"

MotorL293D::MotorL293D(int enableAPin, int inputA1Pin, int inputA2Pin, int enableBPin, int inputB1Pin, int inputB2Pin) 
                    : enableAPin(enableAPin), inputA1Pin(inputA1Pin), inputA2Pin(inputA2Pin), enableBPin(enableBPin), inputB1Pin(inputB1Pin), inputB2Pin(inputB2Pin){
    int pins[] = {enableAPin, inputA1Pin, inputA2Pin, enableBPin, inputB1Pin, inputB2Pin};
    Component::setPinMode(pins, OUTPUT);
    Component::name = "MotorL293D";
    for(int pin : pins){
        digitalWrite(pin, LOW);
    }
    this->directionA = CLOCKWISE;
    this->directionB = CLOCKWISE;  
}

void MotorL293D::turnOn(Side side, bool start=false){
    if(side == A){
        digitalWrite(enableAPin, HIGH); 
        statusA = ON;       
    } else if(side == B){
        digitalWrite(enableBPin, HIGH); 
        statusB = ON; 
    }

    if(start)
        startSpin(side);
}
void MotorL293D::turnOff(Side side){
    if(side == A){
        digitalWrite(enableAPin, LOW);
        digitalWrite(inputA1Pin, LOW);
        digitalWrite(inputA2Pin, LOW); 
        statusA = OFF;       
    } else if(side == B){
        digitalWrite(enableBPin, LOW);
        digitalWrite(inputB1Pin, LOW);
        digitalWrite(inputB2Pin, LOW);  
        statusB = OFF; 
    }
    stopSpin(side);
}

void MotorL293D::startSpin(Side side){
    if(side == A){
        if(statusA == OFF)
            turnOn(side);

        if(directionA == CLOCKWISE)
            spinClock(side);
         else if(directionA == COUNTERCLOCKWISE)
            spinCounter(side);

    } else if(side == B){
        if(statusB == OFF)
            turnOn(side);

        if(directionB == CLOCKWISE)
            spinClock(side);
         else if(directionB == COUNTERCLOCKWISE)
            spinCounter(side); 
    }
}
void MotorL293D::stopSpin(Side side){
    if(side == A){
        digitalWrite(inputA1Pin, LOW);
        digitalWrite(inputA2Pin, LOW); 
        statusA = STOP_SPIN;     
    } else if(side == B){
        digitalWrite(inputB1Pin, LOW);
        digitalWrite(inputB2Pin, LOW); 
        statusB = STOP_SPIN; 
    }
}

void MotorL293D::changeDirection(Side side, bool start=false){
    if(side == A){
        if(statusA == OFF)
            turnOn(side);

        if(directionA == CLOCKWISE)
            spinCounter(side);
         else if(directionA == COUNTERCLOCKWISE)            
            spinClock(side);   

    } else if(side == B){
        if(statusB == OFF)
            turnOn(side);

        if(directionB == CLOCKWISE)
            spinCounter(side); 
         else if(directionB == COUNTERCLOCKWISE)            
            spinClock(side);
    }
}
void MotorL293D::spinClock(Side side){
    if(side == A){
        digitalWrite(inputA1Pin, LOW);
        digitalWrite(inputA2Pin, HIGH); 
        statusA = SPIN_CLOCKWISE;
        directionA = CLOCKWISE;     
    } else if(side == B){
        digitalWrite(inputB1Pin, LOW);
        digitalWrite(inputB2Pin, HIGH); 
        statusB = SPIN_CLOCKWISE; 
        directionB = CLOCKWISE; 
    }
}
void MotorL293D::spinCounter(Side side){
    if(side == A){
        digitalWrite(inputA1Pin, HIGH);
        digitalWrite(inputA2Pin, LOW); 
        statusA = SPIN_COUNTERCLOCKWISE;
        directionA = COUNTERCLOCKWISE;     
    } else if(side == B){
        digitalWrite(inputB1Pin, HIGH);
        digitalWrite(inputB2Pin, LOW); 
        statusB = SPIN_COUNTERCLOCKWISE; 
        directionB = COUNTERCLOCKWISE; 
    }
}

Status MotorL293D::getStatusA(){ return this->statusA; }
Status MotorL293D::getStatusB(){ return this->statusB; }