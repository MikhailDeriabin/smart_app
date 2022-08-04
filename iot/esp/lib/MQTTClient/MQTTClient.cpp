#include "MQTTClient.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

MQTTClient* MQTTClient::instance = nullptr;

MQTTClient* MQTTClient::getInstance(int id){
    if(instance == nullptr)
        instance = new MQTTClient(id);
   
    return instance;
}

//PubSubClient* MQTTClient::getPubSubClient(){ return this->pubSubClient; }
int MQTTClient::getClientId(){ return this->id; }

PubSubClient* MQTTClient::buildPubSubClient(){
    WiFiClient wifiClient;  
    PubSubClient* pubSubClient = new PubSubClient(mqtt_server, mqtt_port, wifiClient);
    return pubSubClient;
}