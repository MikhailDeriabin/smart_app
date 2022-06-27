#ifndef LAMP_H
#define LAMP_H

#include "Device.h"

/**
 * @brief The class represents LED lamp.
 * The class has methods for manipulating with LED DC lamps.
 * The class extends abstract class Device.
 */
class Lamp : public Device{
private:
    bool isOn;
public: 
    /**
     * @brief Construct a new Lamp object.
     * 
     * @param pinMode pin number where lamp is attached
     */
    Lamp(int pinNumber);

    /**
     * @brief The method make a pulse signal(turn on -> turn off) with the given interval.
     * 
     * @param interval pulse interval time in ms
     */
    void pulse(float interval);

    /**
     * @brief The method turn the lamp on.
     */
    void turnOn() override;

    /**
     * @brief The method turn the lamp off.
     */
    void turnOff() override;
};

#endif