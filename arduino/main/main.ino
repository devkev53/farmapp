#include <DHT.h>
#include <DHT_U.h>

#include <ArduinoJson.h>
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <HTTPClient.h>
#include <WiFiClient.h>

#include "globales.h"
#include "thscm.h"




char jsonOutput[128];
int ground_value = 0;
float humidity;
float tempC;
float tempF;
int is_on_selenoide = 0;
volatile double waterFlow;
unsigned long on_time_selenoide = 0;
unsigned long off_time_selenoide = 0;

// Multitareas
TaskHandle_t taskCore0_fluid;

void setup() {
  xTaskCreatePinnedToCore(
    readFluid,  // Nombre del loop
    "Task_2",   // Nombre
    10000,       // Tamaño de la pila
    NULL,       // Parametro casi siempre nulo
    1,          // Prioridad de la tarea
    &taskCore0_fluid, //Nombre de la tarea
    0           // Nucleo donde se ejecuta
  );

  setup_thscm();
  // // put your setup code here, to run once:
  // // Serial.begin(115200);
  // // pinMode(BUILTIN_LED, OUTPUT);
  // // pinMode(22, OUTPUT);
  // // pinMode(pin_ground, INPUT);
  // HT.begin();
  // waterFlow = 0;
  // // attachInterrupt(35, pulse, RISING);

  
  // WiFiManager wm;

  // bool res;

  // res = wm.autoConnect("AutoConnectAP","password"); // password protected ap

  // if(!res) {
  //     Serial.println("Failed to connect");
  //     // ESP.restart();
  // } 
  // else {
  //     //if you get here you have connected to the WiFi    
  //     Serial.println("connected...yeey :)");
  // }
}


void loop() {
  // // obtener frecuencia en Hz
  // float frequency = GetFrequency();
 
  // // calcular caudal L/min
  // float flow_Lmin = frequency / factorK;

  // dt=millis()-t0; //calculamos la variación de tiempo
  // t0=millis();
  // volumen=volumen+(flow_Lmin/60)*(dt/1000); // volumen(L)=caudal(L/s)*tiempo(s)

 
  // Serial.print("Frecuencia: ");
  // Serial.print(frequency, 0);
  // Serial.print(" (Hz)\tCaudal: ");
  // Serial.print(flow_Lmin, 3);
  // Serial.print("(L/min)");
  // Serial.print ("\tVolumen: "); 
  // Serial.print(volumen,3); 
  // Serial.println (" L");
  post_ground_state();
  get_irrigation_state();
  // Serial.print("Hola mundo");

  // put your main code here, to run repeatedly:
  // loop_led_blue();
  // checkOpenValvule();
  // writeGroundState();
  // read_ground();

}

void readFluid(void *parameter){
  // count_volumen();
  while(true) {
    count_volumen();
    delay(200);
  }
  vTaskDelay(10);
}
// String checkOpenValvule() {
//   // Send an HTTP GET request every 5 seconds
//   static long last_change = 0;
//   static int state_request = 0;
  

//   long time = millis();

//   String payload = "{}";
//   StaticJsonDocument<300> doc;

//   if (time - last_change > 5000) {
//     last_change = time;

//     if (state_request == 1) {
//       state_request = 0;
//       HTTPClient http;

//       String activeValvulePath = serverName + thscm_name + "/activate-irrigation/";

//       // Your Domain name with URL path or IP address with path
//       http.begin(activeValvulePath.c_str());

//       // Send HTTP GET request
//       int httpResponseCode = http.GET();


//       if (httpResponseCode > 0 ) {
//         Serial.print("HTTP Response code: ");
//         Serial.println(httpResponseCode);
//         String payload = http.getString();
//         Serial.println(payload);
//         DeserializationError error = deserializeJson(doc, payload);
//         if (error) { return payload; }
//         bool stat = doc["active"];
//         Serial.print("Stat: ");
//         Serial.println(stat);
//         Serial.print("is on selenoide: ");
//         Serial.println(is_on_selenoide);

//         if (stat) {
//           activate_selenoide();
//         } else {
//           if ( is_on_selenoide == 1) {
//             deactivate_selenoide();
//           }
//         }

//       } else {
//         Serial.print("Error code: ");
//         Serial.println(httpResponseCode);
//         String payload = http.getString();
//         Serial.println(payload);
//       }

//       http.end();
//     } else {
//       // digitalWrite(BUILTIN_LED, HIGH);
//       state_request = 1;
//     }

//   }
//   return payload;

// }

// String writeGroundState() {
//   // Send an HTTP GET request every 10 minutes
//   static long last_change = 0;
//   static int state_request = 0;

//   long time = millis();

//   String payload = "{}";

//   if (time - last_change > 600000) {
//     last_change = time;

//     if (state_request == 1) {
//       state_request = 0;
//       WiFiClient client;
//       HTTPClient http_post;

//       String saveGroundStatePath = serverName + thscm_name + "/ground_state/";

//       // Your Domain name with URL path or IP address with path
//       http_post.begin(client, saveGroundStatePath);
//       http_post.addHeader("Content-Type", "application/json");

//       StaticJsonDocument<200> doc;

//       set_sensor_data();

      
//       doc["air_humedity"] = humidity;
//       doc["temperature_c"] = tempC;
//       doc["temperature_f"] = tempF;
//       doc["ground_humedity"] = ground_value;

//       String requestBody;
//       serializeJson(doc, requestBody);

      
      
//       // String httpRequestData = "{\"air_humedity\":\"15.5\",\"temperature_c\":\"53.5\",\"temperature_f\":\"5.55\",\"ground_humidity\":15.5\"}";
//       // Send HTTP POST request
//       int httpResponseCode = http_post.POST(requestBody);


//       if (httpResponseCode > 0 ) {
//         // Serial.println(data);
//         Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
//         Serial.println("*     Realizadon el POST      *");
//         Serial.println("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
//         Serial.print("HTTP Response code: ");
//         Serial.println(httpResponseCode);
//         String payload = http_post.getString();
//         Serial.println(payload);
//       } else {
//         Serial.print("Error code: ");
//         Serial.println(httpResponseCode);
//       }

//       http_post.end();
//     } else {
//       // digitalWrite(BUILTIN_LED, HIGH);
//       state_request = 1;
//     }

//   }

//   return payload;
// }

// void loop_led_blue() {
//   static long last_change = 0;
//   static int state_led = 0;

//   long time = millis();

//   if (time - last_change > 1000) {
//     last_change = time;

//     if (state_led == 1) {
//       digitalWrite(BUILTIN_LED, LOW);
//       state_led = 0;
//     } else {
//       digitalWrite(BUILTIN_LED, HIGH);
//       state_led = 1;
//     }
//   }
// }

// void set_sensor_data() {
//   ground_value = analogRead(pin_ground);
//   humidity = HT.readHumidity();
//   tempC = HT.readTemperature();
//   tempF = HT.readTemperature(true);

//   Serial.print("La humedad es: ");
//   Serial.print(humidity);


// }

// void read_ground() {
// // Send an HTTP GET request every 10 minutes
//   static long last_change = 0;
//   static int state_read = 0;

//   long time = millis();

//   if (time - last_change > 10000) {
//     last_change = time;

//     if (state_read == 1) {
//       state_read = 0;
//       ground_value = analogRead(pin_ground);
//       humidity = HT.readHumidity();
//       tempC = HT.readTemperature();
//       tempF = HT.readTemperature(true);
      
//       Serial.println("");
//       Serial.println("- - - - - - - - - - - - - - - - - - - - - ");
//       Serial.print("La Humedad en tierra es: ");
//       Serial.println(ground_value);
//       Serial.print("La Hemedad en Aire es: ");
//       Serial.println(humidity);
//       Serial.print("La Temperatura en Celcius es: ");
//       Serial.println(tempC);
//       Serial.print("La Temperatura en Farenheigth es: ");
//       Serial.println(tempF);
//       Serial.println("- - - - - - - - - - - - - - - - - - - - - ");
//       Serial.println("");


      
//     } else {
//       // digitalWrite(BUILTIN_LED, HIGH);
//       state_read = 1;
//     }

//   }

// }

// void activate_selenoide() {
//   on_time_selenoide = millis();
//   is_on_selenoide = 1;
//   digitalWrite(22, HIGH);
//   // pulse();
// }

// void deactivate_selenoide() {
//   if(is_on_selenoide == 1) {
//     off_time_selenoide = millis();
//     is_on_selenoide = 0;
//     digitalWrite(22, LOW);
//     Serial.print("Start Irrigation timestamp: ");
//     Serial.println(on_time_selenoide);
//     Serial.print("End Irrigation timestamp: ");
//     Serial.println(off_time_selenoide);
//     post_irrigation_data();
//     waterFlow = 0;
//   }
// }

// // void pulse() {
// //   waterFlow += 1.0 / 450.0;
// //   Serial.print("El flujo de agua es: ");
// //   Serial.println(waterFlow);
// // }

// void post_irrigation_data() {
//   String payload = "{}";
//   WiFiClient client;
//   HTTPClient http_irrigation_post;

//   String irrigationPostPath = serverName + thscm_name + "/add_data_irrigation/";
//   // Your Domain name with URL path or IP address with path
//   http_irrigation_post.begin(client, irrigationPostPath);
//   http_irrigation_post.addHeader("Content-Type", "application/json");

//   StaticJsonDocument<200> data;

//   data["water_quantity"] = humidity;
//   data["duration"] = off_time_selenoide - on_time_selenoide;

//   String requestBody;
//   serializeJson(data, requestBody);

//   int httpResponseCode = http_irrigation_post.POST(requestBody);
//   if (httpResponseCode > 0 ) {
//     Serial.print("Datos de riego enviados a DB: ");
//     Serial.print("HTTP Response code: ");
//     Serial.println(httpResponseCode);
//   } else {
//     Serial.print("Error code: ");
//     Serial.println(httpResponseCode);
//   }
//   http_irrigation_post.end();
// }