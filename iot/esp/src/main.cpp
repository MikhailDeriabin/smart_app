#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Replace the next variables with your SSID/Password combination
const char* ssid = "ASUS_28";
const char* password = "228asus228";

// Add your MQTT Broker IP address, example:
//const char* mqtt_server = "192.168.1.144";
const char* mqtt_server = "192.168.50.93";
const int mqtt_port = 1884;
const char *topic = "esp32/output";

WiFiClient espClient;
PubSubClient client(espClient);

const int ledPin = 5;

void setup_wifi();
void callback(char *topic, byte *payload, unsigned int length);

void setup() {
  Serial.begin(9600); 
  delay(10);
  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "esp8266-client-";
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

  client.publish(topic, "Hello From ESP8266!");
  client.subscribe(topic);

  pinMode(ledPin, OUTPUT);
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
  String msg;
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char) payload[i]);
    msg += (char) payload[i];
  }
  Serial.println();
  Serial.println(" - - - - - - - - - - - -");

  if(String(topic) == "esp32/output"){
    if(msg == "on"){
      digitalWrite(ledPin, HIGH);
    } else if(msg == "off"){
      digitalWrite(ledPin, LOW);
    }
  }
}

void loop() {
  client.loop();
}