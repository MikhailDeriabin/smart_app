#include "DHTSensor.h"
#include "DHT.h"

DHTSensor::DHTSensor(int pinNumber) : Sensor(pinNumber){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin();
   Component::name = "DHTSensor";
}

DHTSensor::DHTSensor(int pinNumber, uint8_t updatingInteval) : Sensor(pinNumber){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin(updatingInteval);
   Component::name = "DHTSensor";
}

float DHTSensor::getTemerature(){ return this->dht->readTemperature(); }
float DHTSensor::getHumidity(){ return this->dht->readHumidity(); }