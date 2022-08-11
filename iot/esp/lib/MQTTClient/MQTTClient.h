#ifndef MQTTCLIENT_H
#define MQTTCLIENT_H

#include <PubSubClient.h>
//#include <ESP8266WiFi.h>

class MQTTClient{       
    private:   
        static MQTTClient* instance;
        PubSubClient* pubSubClient;
        int id; 
        const char* mqtt_server = "192.168.50.93";
        const int mqtt_port = 1884;
        MQTTClient(int id){
            this->id = id; 
            /*          
            WiFiClient wifiClient;
            pubSubClient = new PubSubClient(mqtt_server, mqtt_port, wifiClient);*/
        }         
        void operator=(MQTTClient const&);
         
    public:
        MQTTClient(MQTTClient &other) = delete;
        
        static MQTTClient* getInstance(int id);
        //PubSubClient* getPubSubClient();
        int getClientId();  
        PubSubClient*  buildPubSubClient();     
    };

#endif