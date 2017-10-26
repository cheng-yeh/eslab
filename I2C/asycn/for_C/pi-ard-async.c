#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <linux/i2c-dev.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <wiringPi.h>

#define ADDRESS 0x04

static const char *devName = "/dev/i2c-1";
volatile char buf[1];
int temp;
int file, num;
	
void my_ISR(void){
	if (read(file, (void*) buf, 1) == 1) {
		temp = (int) buf[0];
		printf("Received %d\n", temp);
	}
	else printf("Error!");
}

int main(int argc, char** argv) {
	printf("I2C: Connecting\n");
	if ((file = open(devName, O_RDWR)) < 0) {
		fprintf(stderr, "I2C: Failed to access %d\n", devName);
		exit(1);
	}
	printf("I2C: acquiring buss to 0x%x\n", ADDRESS);
	if (ioctl(file, I2C_SLAVE, ADDRESS) < 0) {
		fprintf(stderr, "I2C: Failed to acquire bus access/talk to slave 0x%x\n", ADDRESS);
		exit(1);
	}

	if (wiringPiSetup() < 0) {
		fprintf(stderr, "Unable to setup wiringPi: %s\n", strerror(errno));
		return 1;
	}

	if ( wiringPiISR(0, INT_EDGE_FALLING, &my_ISR) < 0 ) {
		fprintf(stderr, "Unable to setup ISR: %s\n", strerror(errno));
		return 1;
	}

	printf("Please enter a number 0 -255: ");
	while (scanf("%d", &num) == 1) {
		printf("Sending %d\n", num);
		if (write(file, &num, 1) == 1) {
			usleep(100000);
			printf("Please enter a number 0 -255: ");
		}
	}
}
