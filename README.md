# eslab
* This is the repository for the assignments for Embedded System in 2017 fall.  
* Two assignments are in this repository, one is in folder BLE while the other in I2C.

# Description 
## BLE
The goal of this assignment is to establish a BLE service with C, python, or Node.js and transfer data between the central and the peripheral.  We choose to use Node.js because there are two powerful libraries: bleno and noble, which can act as peripheral and central respectively.  We set up the service to transfer the real time acceleration read from adxl-345(a 3-axis accelerometer) on the peripheral to the central.

### central
* This folder contains the needed component and directory of noble.
#### central_acc
* central.js
> The central will first scan for BLE service. Once find any, it will stop scan and discover all the characteristics of the service. If there's no characteristics missed, ... ..





## I2C

