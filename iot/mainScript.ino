#include "src/component/device/MotorL293D.h"

MotorL293D motorController(2, 3, 4, 5, 6, 7);

void setup() {
    Serial.begin(9600);
    motorController.turnOn(MotorL293D::B);
}

void loop() {
    motorController.turnOn(MotorL293D::B);
    Serial.println("Clockwise");
    motorController.spinClock(MotorL293D::B); 
    delay(5000);
    Serial.println("Stop");
    motorController.stopSpin(MotorL293D::B);
    delay(2000);
    Serial.println("Counterclockwise");
    motorController.changeDirection(MotorL293D::B);
    delay(5000);
    Serial.println("Turned off");
    motorController.turnOff(MotorL293D::B);    
    delay(2000);
}