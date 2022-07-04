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
    uint8_t intensivity;
    float brightness;
public:
    Lamp(int pinNumber, bool isPinAnalog=false, uint8_t intensivity=255, float brightness=1);

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

    void increaseIntensivity(uint8_t intensivity, bool write=false);
    void decreaseIntensivity(uint8_t intensivity, bool write=false);

    void setIntensivity(uint8_t intensivity, bool write=false);
    uint8_t getIntensivity();

    void setBrightness(float brightness, bool write=false);
    float getBrightness();
};

#endif