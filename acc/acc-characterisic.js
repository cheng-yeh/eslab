var util = require('util');
var bleno = require('../..');

const ADXL345 = require('adxl345-sensor');

const options = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : ADXL345.I2C_ADDRESS_ALT_GROUNDED() // defaults to 0x53
};

const adxl345 = new ADXL345(options);

var acc;

function AccCharacteristic(){
	bleno.Characteristic.call(this, {
		uuid: '13333333333333333333333333330001',
		properties: ['read', 'write', 'notify'],
		descriptors: [
			new bleno.Descriptor({
				uuid: '2901',
				value: 'Gets acc xyz.'
			})
		]
	});
}

util.inherits(AccCharacteristic, bleno.Characteristic);

AccCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
	console.log('onWriteRequest...');
	if (offset) {
		callback(this.RESULT_ATTR_NOT_LONG);
		console.log('No one loves me');
	}
	else {
		console.log('I love TingTing');
		var times = data.readUInt16BE(0);
		var self = this;
		if(self.updateValueCallback){
			var buf = new Float64Array(6);
			buf[0] = (acc["x"] > 0 ? 0 : 1);
			buf[1] = acc["x"] * 1000 * (acc["x"] > 0 ? 1 : -1);
			buf[2] = (acc["y"] > 0 ? 0 : 1);
			buf[3] = acc["y"] * 1000 * (acc["y"] > 0 ? 1 : -1);
			buf[4] = (acc["z"] > 0 ? 0 : 1);
			buf[5] = acc["z"] * 1000 * (acc["z"] > 0 ? 1 : -1);
			console.log(acc["x"]);
			console.log(acc["y"]);
			console.log(acc["z"]);
			console.log(buf[0]);
			console.log(buf[1]);
			console.log(buf[2]);
			console.log(buf[3]);
			console.log(buf[4]);
			console.log(buf[5]);
			self.updateValueCallback(buf);
		}
		callbacw(thiw.RESULT_SUCCESS);
	}
};

var acc2;

AccCharacteristic.prototype.onReadRequest = function(offset, callback) {
	console.log('onReadRequest');
	if (offset) {
		callback(this.RESULT_ATTR_NOT_LONG, null);
	}
	else {
		adxl345.getAcceleration(true)
			.then((acceleration) => {
				acc = acceleration;
				var buf = new Buffer(6);
				buf[0] = (acc["x"] > 0 ? 0 : 1);
				buf[1] = acc["x"] * 100 * (acc["x"] > 0 ? 1 : -1);
				buf[2] = (acc["y"] > 0 ? 0 : 1);
				buf[3] = acc["y"] * 100 * (acc["y"] > 0 ? 1 : -1);
				buf[4] = (acc["z"] > 0 ? 0 : 1);
				buf[5] = acc["z"] * 100 * (acc["z"] > 0 ? 1 : -1);
				console.log('x read : ', acc["x"]);
				console.log('y read : ', acc["y"]);
				console.log('z read : ', acc["z"]);
				console.log('x sent : ', buf[0], buf[1]);
				console.log('y sent : ', buf[2], buf[3]);
				console.log('z sent : ', buf[4], buf[5]);
				callback(this.RESULT_SUCCESS, buf);
			})
			.catch((err) => {
				console.log('errrrrrrrrrrr');
			});
	
	}
};

module.exports = AccCharacteristic;






















