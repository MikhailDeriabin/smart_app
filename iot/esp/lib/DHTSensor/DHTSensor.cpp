#include "DHTSensor.h"
#include "Arduino.h"
#include "Adafruit_Sensor.h"
#include "DHT.h"
#include <Status.h>
#include <Converter.h>
#include <Util.h>
#include <CommandValue.h>
#include "WiFiMQTTConnector.h"
#include "PubSubClient.h"
#include "SensorValue.h"

DHTSensor::DHTSensor(int pinNumber, WiFiMQTTConnector* wifiMQTTConnector) : pinNumber(pinNumber), Sensor(wifiMQTTConnector){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin();
   Component::name = "DHTSensor";
   int pins[] = { pinNumber };
   Component::setPinMode(pins, 1, INPUT);
}

DHTSensor::DHTSensor(int pinNumber, uint8_t updatingInteval, WiFiMQTTConnector* wifiMQTTConnector) : pinNumber(pinNumber), Sensor(wifiMQTTConnector){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin(updatingInteval);
   Component::name = "DHTSensor";
}

void DHTSensor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         Serial.println("MEASURE");
         sendData();
         break;

      default:
         break;
   }
}

void DHTSensor::sendData(){
   Util util;
   Converter converter;
   PubSubClient* pubSubClient = wifiMQTTConnector->getPubSubClient();
   char* topic = wifiMQTTConnector->getTopicById(id);
 /* 
   char currentTemperatureRaw[20];
   int currentTemperatureSize = 0;
   float currentTemerature = getTemerature();
   //if the num is not nan
   if(currentTemerature == currentTemerature){     
      converter.floatToCharArr(currentTemerature, currentTemperatureRaw, &currentTemperatureSize);
      char currentTemeratureChar[currentTemperatureSize];
      for(int i=0; i<currentTemperatureSize; i++)
         currentTemeratureChar[i] = currentTemperatureRaw[i];

      pubSubClient->publish(topic, (uint8_t*)&currentTemeratureChar, (unsigned int)currentTemperatureSize);
   }

   char currentHumidityRaw[20];
   int currentHumiditySize = 0;
   float currentHumidity = getHumidity();
   //if the num is not nan
   if(currentHumidity == currentHumidity){     
      converter.floatToCharArr(currentHumidity, currentHumidityRaw, &currentHumiditySize);
      char currentHumidityChar[currentHumiditySize];
      for(int i=0; i<currentHumiditySize; i++)
         currentHumidityChar[i] = currentHumidityRaw[i];

      pubSubClient->publish(topic, (uint8_t*)&currentHumidityChar, (unsigned int)currentHumiditySize);
   }*/

   SensorValue sensorValues[2];
   sensorValues[0] = TEMPERATURE;
   sensorValues[1] = HUMIDITY;

   float currentTemerature = getTemerature();
   if(currentTemerature != currentTemerature)
      currentTemerature = 0.0f;
   float currentHumidity = getHumidity();
   if(currentHumidity != currentHumidity)
      currentHumidity = 0.0f;
   float values[2] = {currentTemerature, currentHumidity};

   wifiMQTTConnector->sendSensorValues(topic, sensorValues, values, 2);   
}

float DHTSensor::getTemerature(){ return this->dht->readTemperature(); }
float DHTSensor::getHumidity(){ return this->dht->readHumidity(); }