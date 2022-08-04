#include "WiFiMQTTConnector.h"
#include <MQTTClient.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

WiFiMQTTConnector::WiFiMQTTConnector(char* clientId, const int componentCount){
    pubSubClient = new PubSubClient(mqtt_server, mqtt_port, wifiClient);

    this->componentCount = componentCount;
    this->clientId = clientId; 

    topics = new char*[componentCount];
    String topicStart(clientId);
    topicStart += "/";
    for(int i=0; i<componentCount; i++){
        String wholeTopic = topicStart + i;        
        char* wholeTopicArr = new char[wholeTopic.length()];
        for(int j=0; j<wholeTopic.length(); j++){
            wholeTopicArr[j] = wholeTopic[j];
        }
        topics[i] = wholeTopicArr;
    }   
}

void WiFiMQTTConnector::connectToBroker(){
    setup_wifi();
    while (!pubSubClient->connected()) {
        Serial.println("The client connects to mosquitto mqtt broker");

        if (pubSubClient->connect(clientId)) {
            Serial.println("Public emqx mqtt broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(pubSubClient->state());
            delay(2000);
        }   
    }
    for(int i=0; i<componentCount; i++){
        pubSubClient->subscribe(topics[i]);
    }
}

void WiFiMQTTConnector::setup_wifi() {
  WiFi.begin(ssid, password);
  Serial.println();
  Serial.print("Connecting ...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

int WiFiMQTTConnector::getDeviceIdFromTopic(char* topic){
    for(int i=0; i<componentCount; i++){
        if(String(topics[i]) == String(topic)){
            return i;
        }
    }
    return -1;
}

PubSubClient* WiFiMQTTConnector::getPubSubClient(){ return this->pubSubClient; }