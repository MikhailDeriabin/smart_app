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
    const int pinNumber;
    const bool isPinAnalog;
    float intensivity;
public: 
    /**
     * @brief Construct a new Lamp object.
     * 
     * @param pinNumber pin number where lamp is attached
     */
    Lamp(int pinNumber);
    Lamp(int pinNumber, bool isPinAnalog);
    //for analog pin only
    Lamp(int pinNumber, bool isPinAnalog, float intensivity);

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

    void increaseIntensivity(float intensivity, bool write=false);
    void decreaseIntensivity(float intensivity, bool write=false);

    void setIntensivity(float intensivity, bool write=false);
    float getIntensivity();
};

#endif