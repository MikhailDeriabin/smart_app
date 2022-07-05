#ifndef MOTORL293D_H
#define MOTORL293D_H

#include "../Component.h"
#include "../Status.h"

//Class for L293D with DC motor connected. Motor must use the whole side of the controller ((Input1 and Input2) or (Input3 and Input4) pins)
//Side A = left side (pins 1-8), side B = right(pins 9-16)

class MotorL293D : public Component{
private:
    const int enableAPin, inputA1Pin, inputA2Pin, enableBPin, inputB1Pin, inputB2Pin;
    Status statusA, statusB;
    enum Direction { CLOCKWISE, COUNTERCLOCKWISE };
    Direction directionA, directionB;
public:
    enum Side{ A, B };
   
    MotorL293D(int enableAPin, int inputA1Pin, int inputA2Pin, int enableBPin, int inputB1Pin, int inputB2Pin);

    void turnOn(Side side, bool start=false);
    void turnOff(Side side);

    void startSpin(Side side);
    void stopSpin(Side side);
    void changeDirection(Side side, bool start=false);
    void spinClock(Side side);
    void spinCounter(Side side);

    Status getStatusA();
    Status getStatusB();
};

#endif