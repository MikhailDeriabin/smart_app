#include "DHTSensor.h"
#include "DHT.h"
#include <Status.h>
#include <Converter.h>
#include <Util.h>
#include <CommandValue.h>

DHTSensor::DHTSensor(int pinNumber) : pinNumber(pinNumber){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin();
   Component::name = "DHTSensor";
   int pins[] = { pinNumber };
   Component::setPinMode(pins, 1, INPUT);
}

DHTSensor::DHTSensor(int pinNumber, uint8_t updatingInteval) : pinNumber(pinNumber){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin(updatingInteval);
   Component::name = "DHTSensor";
}

void giveCommand(Status status, char* value, int valueSize){
   Util util;
   Converter converter;

   switch (status){
      case MEASURE:
         Serial.println("MEASURE");
         sendData();
         break;

      default:
         break;
   }
}

void sendData(char topic[]=nullptr, int topicSize=0){

}

float DHTSensor::getTemerature(){ return this->dht->readTemperature(); }
float DHTSensor::getHumidity(){ return this->dht->readHumidity(); }