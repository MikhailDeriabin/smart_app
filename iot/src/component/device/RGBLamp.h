#ifndef RGBLAMP_H
#define RGBLAMP_H

#include "Device.h"
#include "Lamp.h"

/**
 * @brief The class represents RGB Lamp lamp.
 * The class has methods for manipulating with LED RGB DC lamps.
 * The class extends abstract class Device.
 */
class RGBLamp : public Device{
private:
    const int redPinNumber, greenPinNumber, bluePinNumber;
    Lamp* redLamp; 
    Lamp* greenLamp; 
    Lamp* blueLamp;
public: 
    /**
     * @brief Construct a new RGBLamp object.
     * 
     * @param pinNumber pin number where lamp is attached
     */
    RGBLamp(int redPinNumber, int greenPinNumber, int bluePinNumber);

    /**
     * @brief The method turn the lamp on.
     */
    void turnOn() override;

    /**
     * @brief The method turn the lamp off.
     */
    void turnOff() override;

    /**
     * @brief The method make a pulse signal(turn on -> turn off) with the given interval.
     * 
     * @param interval pulse interval time in ms
     */
    void pulse(float interval);

    void setIntensivity(uint8_t intensivity, bool write=false);
    void setRedIntensivity(uint8_t intensivity, bool write=false);
    void setGreenIntensivity(uint8_t intensivity, bool write=false);
    void setBlueIntensivity(uint8_t intensivity, bool write=false);
    
    void setColor(uint8_t redIntensivity, uint8_t greenIntensivity, uint8_t blueIntensivity, bool write=false);    
    void setBrightness(float brightness, bool write=false);
};

#endif