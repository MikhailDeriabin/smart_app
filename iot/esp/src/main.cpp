#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "Lamp.h"
#include "Status.h"
#include "CommandValue.h"
#include "Component.h"
#include "Converter.h"
#include "Util.h"

const char* ssid = "ASUS_28";
const char* password = "228asus228";

const char* mqtt_server = "192.168.50.93";
const int mqtt_port = 1884;
const char* topic = "esp8266/1";

void setup_wifi();
void callback(char *topic, byte *payload, unsigned int length);

WiFiClient espClient;
PubSubClient client(espClient);

//Components
Lamp lamp(5);

void setup() {
  Serial.begin(9600); 
  
  delay(10);
  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "esp8266-";
    client_id += String(WiFi.macAddress());

    Serial.printf("The client %s connects to mosquitto mqtt broker\n", client_id.c_str());

    if (client.connect(client_id.c_str())) {
      Serial.println("Public emqx mqtt broker connected");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }   
  }

  client.publish(topic, "ESP8266 connected!");
  client.subscribe(topic);
}

void setup_wifi() {
  WiFi.begin(ssid, password);
// We start by connecting to a WiFi network
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

void callback(char *topic, byte *payload, unsigned int length) {
  Converter converter;
  Util util;
  char msg[length];
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char) payload[i]);
    msg[i] = (char) payload[i];
  }
  Serial.println();
  Serial.println(" - - - - - - - - - - - -");


  if(String(topic) == "esp8266/1"){   
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

      lamp.giveCommand(status, value, length-separatorIndex);
    } else{
      lamp.giveCommand(status, nullptr, 0);
    }
  }
}

void loop() {
  client.loop();
}