#include "src/component/sensor/LDP.h"

LDP lightSensor(2);

void setup() {
    Serial.begin(9600);
}

int i = 0;

void loop() {
    bool isDark = lightSensor.isDark();

    if(isDark)
        Serial.println("It is dark");
    else
        Serial.println("It is light");

    Serial.print("The value is ");
    Serial.println(lightSensor.getValue());

    delay(1000);
}