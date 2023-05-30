#include <Preferences.h>
#include <HTTP_Method.h>
#include <Uri.h>
#include <WebServer.h>
#include <DHT.h>
#include <Arduino.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiManager.h>
#include <Ticker.h>
#define Type DHT11

#include "data.h";

// Preferencias para guardar en memoria
Preferences preferences;

// Create Object ServerESP32
WebServer server(80);

// Bucles Ticker
Ticker change_led;
Ticker read_litros;
Ticker read_stateIrrigation;
Ticker post_groundState;

// // Clientes HTTP para post y get
HTTPClient http_ground_post;
HTTPClient get_stateIrrigation;


// Const Server Name and Server IP
const String thscm_name = "FLDSMDFR";
String serverName = "";

// Define FLAGS
bool postGroundState = false;
bool readVolume = false;
bool postVolume = false;
bool readIrrigationState = true;
bool wifiConnectionState = false;
bool isOnElectroValvule = 0;
bool isServerOk = false;

// Define PINS
const int pinWifiLed = 2;
const int pinFluidSensor = 35;
const int pinGroundSensor = 34;
const int pinHumiditySensor = 23;
const int pinRelay = 22;

// Var LedWifiState
bool state = false;

// Vars Fluid Sensor
volatile int pulsos = 0; // Varable que almacena el numero de pusos
int litrosMin; // Variable que almacena el caudal (L/hora)
float factor = 7.5; // Factor para convertir la frecuencia a caudal
float litros; // Variable que almacena el numero de litros acumulados
unsigned long tiempoAnterior = 0; // Variable para calcular el tiempo transcurrido
unsigned long pusosAcumulados = 0; // Variable que almacena el numero de pulsos acumulados

// Vars time irrigation
unsigned long timeStart = 0;
unsigned long timeEnd = 0;
String stringTimeDuration;

// Inicializacion de DHT11
DHT HT(pinHumiditySensor, Type); 

// Rutina de serviio de la interrupcion (ISR)
void flujos() {
  pulsos++; // Incrementa en una unidad el numero de pulsos
}

// Funcion para obtener la frecuencia de los pulsos
int frecuency() {

  int frecuencia;
  pulsos = 0;
}

// Lee el flujo y el volumen del caudal
void readFluidVolumenLts() {
  pusosAcumulados += pulsos; // Numero de pulsos acumulados
  litrosMin = (pulsos - 360 / 7.5 ); // Q = frecuencia * 60/7.5 (L/Minutos)
  litros = pusosAcumulados*1.0/450; // Cada 450 pulsos son un litro
  pulsos = 0; // Se reinician los pulsos

  // Serial.println("CAUDALIMETRO YF-S201");
  // Serial.println("--->" + String(litros) + "lts.");
}

// Funcion que enciende y apaga el led segun el estado
void fcLed(){
  state = !state;
  digitalWrite(pinWifiLed, state ? HIGH : LOW);
}

// Funcion para validar que existe conexion al servidor
void conectionOK() {
  String activeValvulePath = serverName + thscm_name + "/activate-irrigation/";
  Serial.println(activeValvulePath);
  // Your Domain name with URL path or IP address with path
  get_stateIrrigation.begin(activeValvulePath.c_str());

  // Send HTTP GET request
  int httpResponseCode = get_stateIrrigation.GET();


  if (httpResponseCode > 0 ) {
    isServerOk = true;
    Serial.println("Conection server is OK 👌");
    preferences.putString("server", serverName);
  } else {
    isServerOk = false;
    Serial.println("Error no connection server..! 🤬");
  }
  get_stateIrrigation.end();

}

// Funcion para leer la data de los sensores DHT11  y Sensor de Suelo
void read_data_sensors() {
  ground_value = analogRead(pinGroundSensor);
  humidity = HT.readHumidity();
  tempC = HT.readTemperature();
  tempF = HT.readTemperature(true);
}

// Incia el metodo setup del codigo principla
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(pinWifiLed, OUTPUT);
  pinMode(pinRelay, OUTPUT);
  pinMode(pinFluidSensor, INPUT_PULLUP);
  digitalWrite(pinWifiLed, LOW);


  // Iniciamos las preferencias
  preferences.begin("server");
  serverName = preferences.getString("server");

  // Inicializamos el objeto del DHT11
  HT.begin();

  startWifi();

  if (wifiConnectionState) {
    conectionOK();
  }

  if (wifiConnectionState) {
    change_led.attach(1, fcLed);
  }
  if (wifiConnectionState) {
    server.on("/", mensajeBase);
    server.on("/ip", changeIp);
  }

  server.begin();

  interrupts(); //Habilitamos las interrupciones
  attachInterrupt(digitalPinToInterrupt(pinFluidSensor), flujos, RISING);
  tiempoAnterior = millis(); // Gurdamos el tiempo que tarda en ejecutarse el millis


  // read_litros.attach(1, readFluidVolumenLts);
  read_stateIrrigation.attach(5, getStateIrrigation);
  post_groundState.attach(300, postGroundDataSensors);
}


void loop() {
  // put your main code here, to run repeatedly:
  server.handleClient();
  if (isOnElectroValvule == 1) {
    if (millis() - tiempoAnterior > 1000) {
      // Realizamos los calculos
      tiempoAnterior = millis();
      pusosAcumulados += pulsos;
      litrosMin = (pulsos - 360 / factor );
      litros = pusosAcumulados * 1.0 / 450;
      pulsos = 0;
    }
  }
}

void mensajeBase() {
  server.send(200, "text/html", Page);
}

void changeIp() {
  if (server.hasArg("valor")) {
    serverName = server.arg("valor");
  }
  server.send(200, "text/plain", "Cambiar Ip");
  Serial.println("Server Ip Registrada: " + String(serverName));
  conectionOK();
  Serial.println(isServerOk);
}

// Inicializa el Wifi
void startWifi() {
  WiFiManager wm;

  bool res;

  res = wm.autoConnect("ConnectAP_THSCM", "password");

  if (!res) {
    Serial.println("Failed to connect");
  } else {
    Serial.println("Connected...! yeey 😊");
    wifiConnectionState = true;
  }
}

// Post ground states for sensor Data
void postGroundDataSensors() {
  if (isServerOk) {

    String payload = "{}";
    WiFiClient client;
    HTTPClient http_ground_post;

    String saveGroundStatePath = serverName + thscm_name + "/ground_state/";
    // Your Domain name with URL path or IP address with path
    http_ground_post.begin(client, saveGroundStatePath);
    http_ground_post.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> doc;

    read_data_sensors();

    doc["air_humedity"] = humidity;
    doc["temperature_c"] = tempC;
    doc["temperature_f"] = tempF;
    doc["ground_humedity"] = ground_value;

    String requestBody;
    serializeJson(doc, requestBody);

    int httpResponseCode = http_ground_post.POST(requestBody);

    if (httpResponseCode > 0 ) {
      // Serial.println(data);
      Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
      Serial.println("*     Realizadon el POST      *");
      Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http_ground_post.getString();
      Serial.println(payload);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http_ground_post.end();
  }

}

void getStateIrrigation() {
  if (isServerOk) {
    String payload = "{}";
    StaticJsonDocument<100> doc;


    String activeValvulePath = serverName + thscm_name + "/activate-irrigation/";

    // Your Domain name with URL path or IP address with path
    get_stateIrrigation.begin(activeValvulePath.c_str());

    // Send HTTP GET request
    int httpResponseCode = get_stateIrrigation.GET();


    if (httpResponseCode > 0 ) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      payload = get_stateIrrigation.getString();
      Serial.println(payload);
      deserializeJson(doc, payload);
      bool stat = doc["active"];
      Serial.println("Stat: --> " + String(stat));

      // readVolume = stat;

      if (stat) {
        timeStart = millis();
        onElectroValvule();
      } else {
        if (isOnElectroValvule == 1) {
          timeEnd = millis();
          getDuration();
          offElectroValvule();
        }
      }
      // controller_electrovalvule();


    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      String payload = get_stateIrrigation.getString();
      Serial.println(payload);
    }

    get_stateIrrigation.end();
  }
  
  humidity = 0;
  tempC = 0;
  tempF = 0;
  ground_value = 0;
}


void getDuration() {
  unsigned long dd, hh, mm, ss, elapsedTime;
  elapsedTime = timeEnd - timeStart;

  // Dias
  dd = elapsedTime/1000/60/60/24;
  // Restar los Dias del tiempo total
  elapsedTime -= dd*1000*60*60*24;
  
  // Horas
  hh = elapsedTime/1000/60/60;
  // Restar los Horas del tiempo total
  elapsedTime -= hh*1000*60*60;
  
  // Minutos
  mm = elapsedTime/1000/60;
  // Restar los Minutos del tiempo total
  elapsedTime -= mm*1000*60;

  // Segundos
  ss = elapsedTime/1000;

  stringTimeDuration = String(hh)+"-"+String(mm)+"-"+String(ss);
}


void onElectroValvule() {
  isOnElectroValvule = 1;
  digitalWrite(pinRelay, HIGH);
  readVolume = true;
}

void offElectroValvule() {
  if (isOnElectroValvule == 1) {
    isOnElectroValvule = 0;
    readVolume = false;
    digitalWrite(pinRelay, LOW);
    postIrrigationData();
  }
}


void postIrrigationData() {
  String payload = "{}";
  WiFiClient client;
  HTTPClient http_irrigation_post;

  String irrigationPostPath = serverName + thscm_name + "/add_data_irrigation/";
  // Your Domain name with URL path or IP address with path
  http_irrigation_post.begin(client, irrigationPostPath);
  http_irrigation_post.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> data;

  data["water_quantity"] = litros;
  data["duration"] = stringTimeDuration;

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
  Serial.println("Se han regado un total de: " + String(litros) + " lts");
  Serial.println("En un tiempo de riego de: " + String(timeStart - timeEnd) + " segundos");
  litros = 0;
  timeStart = 0;
  timeEnd = 0;
}