#include "Device.h"
#include "../Component.h"
#include "Arduino.h"

Device::Device() : Component(){
    this->status = OFF;
    Component::name = "Device";
}