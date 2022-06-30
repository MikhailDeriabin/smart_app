#include "src/component/device/Lamp.h"
#include "src/component/manager/Switch.h"
#include "src/component/sensor/DHTSensor.h"

//define components that will be used in the sketch
Switch mainSwitch(2);
DHTSensor tempHumSensor(3);
Lamp humidityLamp(4);
Lamp temperatureLamp(5);

bool wasTurnedOn = false;

void setup() {
    Serial.begin(9600);
}

void loop() {
    if(mainSwitch.isOn()){
        if(!wasTurnedOn){
            Serial.println("Measurements has been started");
            wasTurnedOn = true;
        }
        
        float currentHumidity = tempHumSensor.getHumidity();
        float currentTemperature = tempHumSensor.getTemerature();

        if(currentHumidity > 60){
            humidityLamp.turnOn();
            Serial.print(currentHumidity);
            Serial.println("%. Warning: Hight humidity!");
        } else{
            humidityLamp.turnOff();
        }

        if(currentTemperature > 30){
            temperatureLamp.turnOn();
            Serial.print(currentTemperature);
            Serial.println("C. Warning: Hight temperature!");
        } else{
            temperatureLamp.turnOff();
        }
    } else if(wasTurnedOn){
        humidityLamp.turnOff();
        temperatureLamp.turnOff();

        wasTurnedOn = false;
        Serial.println("Measurements has been paused");      
    }

    delay(1000);
}