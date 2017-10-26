var util = require('util');
var bleno = require('../..');

var AccCharacteristic = require('./acc-characterisic');

function AccService() {
	bleno.PrimaryService.call(this, {
		uuid: '13333333333333333333333333333337',
		characteristics: [
			new AccCharacteristic(),
		]
	});
}

util.inherits(AccService, bleno.PrimaryService);

module.exports = AccService;
