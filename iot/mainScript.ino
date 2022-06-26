#include "Lamp.h"

const int ledPin = 2;
const int switchPin = 3;

Lamp lamp(2);

void setup() { 
    
}

void loop() {
    lamp.pulse(500);
}