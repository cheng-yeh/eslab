#!usr/bin/python
import time
from smbus2 import SMBusWrapper
from smbus2 import SMBus
import RPi.GPIO as GPIO

bus = SMBus(1)
address = 0x04

def writeNumber(value):
    with SMBusWrapper(1) as bus2:
        bus.write_byte_data(address, 0, value)
    return -1

def readNumber():
    with SMBusWrapper(1) as bus2:
        print('in read number')
        number = bus2.read_byte_data(address, 0)
    return number

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)

def my_callback(channel):
    print('in my_callback')
    num = readNumber()
    print('Recieved : ', num)

GPIO.add_event_detect(17, GPIO.FALLING, callback = my_callback, bouncetime = 300)

try:
    while(True):
        print('inwhile')
        var = input()
        if not var:
            continue
        writeNumber(int(var))
        time.sleep(1)
        #try:
        #    nn = bus.read_byte(address)
        #    print('Received : ', nn)
        #except:
        #    pass
except KeyboardInterrupt:
    GPIO.cleanup()
GPIO.cleanup()


