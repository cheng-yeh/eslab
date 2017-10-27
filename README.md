# eslab
* This is the repository for the assignments for Embedded System in 2017 fall.  
* Two assignments are in this repository, one is in folder BLE while the other in I2C.

# BLE 
## Description
The goal of this assignment is to establish a BLE service with C, python, or Node.js and transfer data between the central and the peripheral.  We choose to use Node.js because there are two powerful libraries: [bleno](https://github.com/sandeepmistry/bleno) and [noble](https://github.com/sandeepmistry/noble), which can act as peripheral and central respectively.  We set up the service to transfer the real time acceleration read from adxl-345(a 3-axis accelerometer) on the peripheral to the central.
* The adxl345 and the peripheral communicate via I2C.
* The adxl345 is manipulated by [adxl345-sensor](https://github.com/skylarstein/adxl345-sensor).
* The acceleration given by the adxl345 is in float type, but the read/write between the peripheral and the central seems to be UInt16BE only.  Also, the negative numbers have trouble when transfering. We solve the above issues by converting the original data into a set of two numbers - one represents positive or not(1 or 0), one represents the value. Multiply the value by 100 and cast it into UInt16BE without lost of accuracy.

## File Description
### central
This folder contains the needed component and directory of [noble](https://github.com/sandeepmistry/noble).
* central_acc/central.js
  * When the BLE device is powered on, the central will first scan for BLE service. Once find any, it will stop scanning, connect to it and check the uid of the service and characteristics(the uid of both have been recorded in this file in advance, in order not to connect to wrong services). If there's no characteristics missed, the central will start to read data from the peripheral every two seconds.

### peripheral
This folder contains the needed component and directory of [bleno](https://github.com/sandeepmistry/bleno).
* peripheral_acc/peripheral.js
  * When the BLE device is powered on, the peripheral will advertising itself and set up the service, waiting for connection. If ```onReadRequest``` of ```AccCharacteristic```is triggered, the acceleration will be read out, converted to readable format, and sent back to the request device.




# I2C
## Description
There are two part of this assignment, one is to modify the reference code of the communication program for RPi and Arduino using the asynchronous IO techniques, the other is to read the 3D accelerator value periodically in 200 Hz from an ADXL345 module to RPi using C and python, respectively.

## File Description
### async 
 * The modified communicaiton program let a user to send an integer whenever from the RPi side or the Arduino side via I2C. 

### adxl
