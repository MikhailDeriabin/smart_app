#ifndef MOTORL293D_H
#define MOTORL293D_H

#include "Component.h"
#include "Status.h"

class MotorL293D : public Component{
private:
    const int enablePin, input1Pin, input2Pin;
    Status status;
    enum Direction { CLOCKWISE, COUNTERCLOCKWISE };
    Direction direction;
public: 
    MotorL293D(int enablePin, int input1Pin, int input2Pin);

    void giveCommand(Status status, char* value, int valueSize) override;

    void turnOn(bool start=false);
    void turnOff();

    void startSpin();
    void stopSpin();
    void changeDirection();
    void spinClock();
    void spinCounter();

    Status getStatus();
};

#endif