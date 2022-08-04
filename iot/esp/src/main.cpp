#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "Lamp.h"
#include "RGBLamp.h"
#include "MotorL293D.h"
#include "Status.h"
#include "CommandValue.h"
#include "Component.h"
#include "Converter.h"
#include "Util.h"
#include "WiFiMQTTConnector.h"

#define ESP8266_D1 5
#define ESP8266_D2 4
#define ESP8266_D3 0
#define ESP8266_D4 2
#define ESP8266_D5 14
#define ESP8266_D6 12
#define ESP8266_D7 13
#define ESP8266_D8 15

void callback(char *topic, byte *payload, unsigned int length);

//Components
Lamp lamp(ESP8266_D8);
RGBLamp rgbLamp(ESP8266_D2, ESP8266_D3, ESP8266_D4);
MotorL293D motor(ESP8266_D7, ESP8266_D6, ESP8266_D5);

const int componentCount = 3;
Component* components[componentCount] = {&lamp, &rgbLamp, &motor};

char* clientId = "1";
WiFiMQTTConnector* wifiMQTTConnector = new WiFiMQTTConnector(clientId, componentCount);
PubSubClient* client = wifiMQTTConnector->getPubSubClient();

void setup() {
  Serial.begin(9600); 
  
  delay(10);
  client->setCallback(callback);
  wifiMQTTConnector->connectToBroker();
}

void callback(char* topic, byte* payload, unsigned int length) {
  Converter converter;
  Util util;
  char msg[length];
  Serial.print("Message: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char) payload[i]);
    msg[i] = (char) payload[i];
  }
  Serial.println();

  int compIndex = wifiMQTTConnector->getDeviceIdFromTopic(topic);
  if(compIndex != -1){
    int separatorIndex = -1;
    for (int i = 0; i < length; i++) {
      if(msg[i] == ';')
        separatorIndex = i;
    }

    char statusValue[separatorIndex];
    util.splitCharArr(msg, statusValue, 0, separatorIndex-1);
    Status status = static_cast<Status>(converter.charArrToInt(statusValue, sizeof(statusValue)/sizeof(statusValue[0])));

    if(separatorIndex < length-1){
      int valueArrSize = length-separatorIndex;
      char value[valueArrSize];
      util.splitCharArr(msg, value, separatorIndex+1, length-1);
      components[compIndex]->giveCommand(status, value, length-separatorIndex);
    } else{
      components[compIndex]->giveCommand(status, nullptr, 0);
    }
  }
}

void loop() {
  client->loop();
}