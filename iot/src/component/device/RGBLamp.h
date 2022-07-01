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

    void setIntensivity(float intensivity, bool write=false);
    void setRedIntensivity(float intensivity, bool write=false);
    void setGreenIntensivity(float intensivity, bool write=false);
    void setBlueIntensivity(float intensivity, bool write=false);
    
    void setColor(float redIntensivity, float greenIntensivity, float blueIntensivity, bool write=false);    
};

#endif