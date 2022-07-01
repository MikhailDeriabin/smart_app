#ifndef RGBLAMP_H
#define RGBLAMP_H

#include "Device.h"

/**
 * @brief The class represents RGB Lamp lamp.
 * The class has methods for manipulating with LED RGB DC lamps.
 * The class extends abstract class Device.
 */
class RGBLamp : public Device{
private:
    const int pinNumber;
public: 
    /**
     * @brief Construct a new RGBLamp object.
     * 
     * @param pinNumber pin number where lamp is attached
     */
    RGBLamp(int pinNumber);

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