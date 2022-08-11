#ifndef WIFIMQTTCONNECTOR_H
#define WIFIMQTTCONNECTOR_H

#include <MQTTClient.h>
#include <ESP8266WiFi.h>

class WiFiMQTTConnector{
private:
    const char* ssid = "ASUS_28";
    const char* password = "228asus228";

    const char* mqtt_server = "192.168.50.93";
    const int mqtt_port = 1884;
    WiFiClient wifiClient;
    PubSubClient* pubSubClient;

    char* clientId;
    int componentCount;
    char** topics;

    void setup_wifi();
public:
    WiFiMQTTConnector(char* clientId, const int componentCount);
    void connectToBroker();
    int getDeviceIdFromTopic(char* topic);
    PubSubClient* getPubSubClient();
};

#endif