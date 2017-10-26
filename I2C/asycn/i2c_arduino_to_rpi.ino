#include <Wire.h>
#define SLAVE_ADDRESS 0x04
int number = 0;
int state = 0;
void setup() {
  pinMode(13, OUTPUT);
  pinMode(8,OUTPUT);
  digitalWrite(8, HIGH);
  Serial.begin(9600); // start serial for output
  // initialize i2c as slave
  Wire.begin(SLAVE_ADDRESS);
  // define callbacks for i2c communication
  Wire.onReceive(receiveData);
  Wire.onRequest(sendData);
  Serial.println("Ready!");
}
void loop() {
  delay(100);
} 
// callback for received data
void receiveData(){
  while(Wire.available()) {
    number = Wire.read();
    Serial.print("data received: vhevk");
    Serial.println(number);
    //sendData();
  }
}
// callback for sending data
void sendData(){
  Wire.write(number);
}

void ISRR(){
  digitalWrite(8, LOW);
  Serial.println("LOW");
  delayMicroseconds(400);
  digitalWrite(8, HIGH);
  
}

void serialEvent(){
  while(Serial.available()){
    number = Serial.read();
    number -= 48;
    Serial.print("data to send: ");
    Serial.println(number);
    ISRR();
  }
}


