#!usr/bin/python
import smbus
import time
import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BCM)

GPIO.setup(17, GPIO.IN, pull_up_down = GPIO.PUD_UP)

bus = smbus.SMBus(1)
address = 0x04

def writeNumber(value):
    bus.write_byte(address, value)
    return -1

def my_callback(channel):
    print(bus.read_byte(address))

GPIO.add_event_detect(17, GPIO.FALLING, callback = my_callback, bouncetime = 300)

try:
    while(True):
        var = input()
        if not var:
            continue
        writeNumber(var)
        time.sleep(1)

except KeyboardInterrupt:
    GPIO.cleanup()
GPIO.cleanup()
