#include "src/component/device/Lamp.h"

//define components that will be used in the sketch
Lamp lamp(2);

void setup() {  
}

void loop() {
    lamp.pulse(500);
}