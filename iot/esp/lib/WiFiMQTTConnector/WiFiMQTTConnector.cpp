#include "WiFiMQTTConnector.h"
#include <MQTTClient.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SensorValue.h>
#include <Converter.h>

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

char**  WiFiMQTTConnector::getTopics(){ return this->topics; }
char*  WiFiMQTTConnector::getTopicById(int id){ return this->topics[id]; }

void WiFiMQTTConnector::sendSensorValues(char* topic, SensorValue sensorValues[], float values[], int valuesCount){
    Converter converter;
    char buffer[100];
    int j = 0;
    int messageSize = 0;
    for(int i=0; i<valuesCount; i++){
        SensorValue currentSensor = sensorValues[i];
        float currentValue = values[i];

        char sensorRaw[10];
        int sensorSize;
        converter.intToCharArr(currentSensor, sensorRaw, &sensorSize);
        for(int k=0; k<sensorSize; k++){
            buffer[j] = sensorRaw[k];
            j++;
        }            
        
        buffer[j] = ':';
        j++;

        char valueRaw[10];
        int valueSize;
        converter.floatToCharArr(currentValue, valueRaw, &valueSize);
        for(int k=0; k<valueSize; k++){
            buffer[j] = valueRaw[k];
            j++;
        }          

        if(i < valuesCount-1){
            buffer[j] = ',';
            j++;
            messageSize--;
        }       
        
        messageSize += sensorSize+valueSize+2;
    }

    char message[messageSize];
    for(int i=0; i<messageSize; i++)
        message[i] = buffer[i];

    this->pubSubClient->publish(topic, (uint8_t*)&message, (unsigned int)messageSize);
}