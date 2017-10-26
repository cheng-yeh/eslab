var util = require('util');
var bleno = require('../..');

var AccService = require('./acc-service');

var name = 'AccSquat';
//var pizzaService = new PizzaService(new pizza.Pizza());
var accService = new AccService()

//
// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [accService.uuid], function(err) {
      if (err) {
        console.log('fuck');
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
      accService
    ]);
  }
});
