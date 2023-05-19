#include <Arduino.h>
#include <DHT.h>
#include <WiFiManager.h>
#include "globales.h"

// Definicion de los pines
const int pin_led_wifi = 2;
const int pin_sensor_flujo = 35;
const int pin_sensor_suelo = 34;
const int pin_sensor_humedad = 23;
const int pin_rele = 22;

// Declaracion de Variables

// Variables para la API
String thscm_name = "FLDSMDFR";
String serverName = "http://192.168.0.11:8000/api/";

// Variables para el tiempo
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

// Variables para sensor de Flujo
const int measureInterval = 2500; // Variame de intervalos
volatile long pulseConter; // Variable contadora de pulsos

// YF-S201
const float factorK = 7.5;
float volumen=0;
long dt=0; //variación de tiempo por cada bucle
long t0=0; //millis() del bucle anterior

// Inicializacion de DHT11
DHT HT(pin_sensor_humedad, Type); 


// Esta funcion ejecuta la interrupcion de la placa
void increase() {
   pulseConter++; // incrementa la variable pulsos en 1
}


float GetFrequency() {
   pulseConter = 0; // Se coloca el contador en 0
 
   interrupts(); // Habilitamos las interrupcions
   delay(measureInterval); // muestra el dato segun la variable
   noInterrupts(); // Desabilita las interrupciones
  
   return (float)pulseConter * 1000 / measureInterval;
}


void setup_thscm() {
  Serial.begin(9600); // Iniciamos el monitor serial
  pinMode(pin_led_wifi, OUTPUT); // Definimos el pin led como salida
  pinMode(pin_rele, OUTPUT); // Definimos el pin del rele como salida

  // Inicializamos el DHT11
  HT.begin();

  // Iniciamos el WifiManager
  WiFiManager WM;
  bool res; // Variable para reseteo de WifiManager
  res = WM.autoConnect("THSCM_AutoAP","password"); // Creamos la red para confniguracion

  // Validamos si la conexion se realizo
  if (!res) {
    Serial.println("Fallo la conexion");
  } else {
    Serial.println("Conectado correctamente...! ;) ");
  }

  // Inicializamos el lector de flujo
  attachInterrupt(digitalPinToInterrupt(pin_sensor_flujo), increase, RISING);
}


String post_ground_state() {
  // Send an HTTP GET request every 10 minutes
  static long last_change = 0;
  static int state_request = 0;

  long time = millis();

  String payload = "{}";

  if (time - last_change > 60000) {
    last_change = time;

    if (state_request == 1) {
      state_request = 0;
      WiFiClient client;
      HTTPClient http_post;

      String saveGroundStatePath = serverName + thscm_name + "/ground_state/";

      // Your Domain name with URL path or IP address with path
      http_post.begin(client, saveGroundStatePath);
      http_post.addHeader("Content-Type", "application/json");

      StaticJsonDocument<200> doc;

      set_sensor_data();
      
      doc["air_humedity"] = humidity;
      doc["temperature_c"] = tempC;
      doc["temperature_f"] = tempF;
      doc["ground_humedity"] = ground_value;

      String requestBody;
      serializeJson(doc, requestBody);

      
      
      // String httpRequestData = "{\"air_humedity\":\"15.5\",\"temperature_c\":\"53.5\",\"temperature_f\":\"5.55\",\"ground_humidity\":15.5\"}";
      // Send HTTP POST request
      int httpResponseCode = http_post.POST(requestBody);


      if (httpResponseCode > 0 ) {
        // Serial.println(data);
        Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
        Serial.println("*     Realizadon el POST      *");
        Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http_post.getString();
        Serial.println(payload);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }

      http_post.end();
    } else {
      // digitalWrite(BUILTIN_LED, HIGH);
      state_request = 1;
    }

  }
  return payload;
}
 
void set_sensor_data() {
  ground_value = analogRead(pin_sensor_suelo);
  humidity = HT.readHumidity();
  tempC = HT.readTemperature();
  tempF = HT.readTemperature(true);
}

String get_irrigation_state() {
  // Send an HTTP GET request every 5 seconds
  static long last_change = 0;
  static int state_request = 0;
  

  long time = millis();

  String payload = "{}";
  StaticJsonDocument<300> doc;

  if (time - last_change > 5000) {
    last_change = time;

    if (state_request == 1) {
      state_request = 0;
      HTTPClient http;

      String activeValvulePath = serverName + thscm_name + "/activate-irrigation/";

      // Your Domain name with URL path or IP address with path
      http.begin(activeValvulePath.c_str());

      // Send HTTP GET request
      int httpResponseCode = http.GET();


      if (httpResponseCode > 0 ) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
        DeserializationError error = deserializeJson(doc, payload);
        if (error) { return payload; }
        bool stat = doc["active"];
        Serial.print("Stat: ");
        Serial.println(stat);
        Serial.print("is on selenoide: ");
        Serial.println(is_on_selenoide);

        if (stat) {
          activate_selenoide();
        } else {
          if ( is_on_selenoide == 1) {
            deactivate_selenoide();
          }
        }

      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }

      http.end();
    } else {
      // digitalWrite(BUILTIN_LED, HIGH);
      state_request = 1;
    }

  }
  return payload;
}

void activate_selenoide() {
  on_time_selenoide = millis();
  is_on_selenoide = 1;
  digitalWrite(22, HIGH);
}

void deactivate_selenoide() {
  if(is_on_selenoide == 1) {
    off_time_selenoide = millis();
    is_on_selenoide = 0;
    digitalWrite(22, LOW);
    Serial.print("Start Irrigation timestamp: ");
    Serial.println(on_time_selenoide);
    Serial.print("End Irrigation timestamp: ");
    Serial.println(off_time_selenoide);
    post_irrigation_data();
  }
}

float count_volumen() {
  // obtener frecuencia en Hz
  float frequency = GetFrequency();
 
  // calcular caudal L/min
  float flow_Lmin = frequency / factorK;

  dt=millis()-t0; //calculamos la variación de tiempo
  t0=millis();
  volumen=volumen+(flow_Lmin/60)*(dt/1000); // volumen(L)=caudal(L/s)*tiempo(s)
  // Serial.print("Volumen: ");
  Serial.println(volumen);
  // Serial.println(" Litros");

  return volumen;
}

void post_irrigation_data() {

  String payload = "{}";
  WiFiClient client;
  HTTPClient http_irrigation_post;

  String irrigationPostPath = serverName + thscm_name + "/add_data_irrigation/";
  // Your Domain name with URL path or IP address with path
  http_irrigation_post.begin(client, irrigationPostPath);
  http_irrigation_post.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> data;

  data["water_quantity"] = volumen;
  data["duration"] = off_time_selenoide - on_time_selenoide;

  String requestBody;
  serializeJson(data, requestBody);

  int httpResponseCode = http_irrigation_post.POST(requestBody);
  if (httpResponseCode > 0 ) {
    Serial.print("Datos de riego enviados a DB: HTTP Response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http_irrigation_post.end();
  volumen = 0;
}
