#include "src/component/device/Lamp.h"
#include "src/component/manager/Manager.h"

//define components that will be used in the sketch
Lamp lamp(2);

void setup() {  
    Lamp lamp3(3);
    Lamp lamp4(4);
    lamp4.setName("main lamp");
    Lamp lamp5(5);

    Component lamps[] = {lamp3, lamp4, lamp5};
    Manager manager(6);
    manager.setComponents(lamps);

    Serial.begin(9600);

    Component* components = manager.getComponents();
    
    Serial.println(components[0].toString());
    Serial.println(components[1].toString());
    Serial.println(components[2].toString());
}

void loop() {
    //lamp.pulse(500);
}