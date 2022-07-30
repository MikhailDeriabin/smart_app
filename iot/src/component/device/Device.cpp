#include "Device.h"
#include "../Component.h"
#include "Arduino.h"

Device::Device() : Component(){
    Component::name = "Device";
}