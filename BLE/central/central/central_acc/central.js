
var noble = require('../..');

var ServiceUuid = '13333333333333333333333333333337';
var AccXCharacteristicUuid = '13333333333333333333333333330001';
//var AccYCharacteristicUuid = '13333333333333333333333333330002';
//var AccZCharacteristicUuid = '13333333333333333333333333330003';

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // Once the BLE radio has been powered on, it is possible
    // to begin scanning for services. Pass an empty array to
    // scan for all services (uses more time and power).
    //
    console.log('scanning...');
    noble.startScanning([ServiceUuid], false);
  }
  else {
    noble.stopScanning();
  }
})

var Service = null;
var AccXCharacteristic = null;
//var AccYCharacteristic = null;
//var AccZCharacteristic = null;

noble.on('discover', function(peripheral) {
  // we found a peripheral, stop scanning
  noble.stopScanning();

  //
  // The advertisment data contains a name, power level (if available),
  // certain advertised service uuids, as well as manufacturer data,
  // which could be formatted as an iBeacon.
  //
  console.log('found peripheral:', peripheral.advertisement);
  //
  // Once the peripheral has been discovered, then connect to it.
  //
  peripheral.connect(function(err) {
    //
    // Once the peripheral has been connected, then discover the
    // services and characteristics of interest.
    //
    peripheral.discoverServices([ServiceUuid], function(err, services) {
      services.forEach(function(service) {
        //
        // This must be the service we were looking for.
        //
        console.log('found service:', service.uuid);

        //
        // So, discover its characteristics.
        //
        service.discoverCharacteristics([], function(err, characteristics) {

          characteristics.forEach(function(characteristic) {
            //
            // Loop through each characteristic and match them to the
            // UUIDs that we know about.
            //
            console.log('found characteristic:', characteristic.uuid);
		console.log('found characteristic:',AccXCharacteristicUuid);
            if (AccXCharacteristicUuid == characteristic.uuid) {
              AccXCharacteristic = characteristic;
            }
            //else if (AccYCharacteristicUuid == characteristic.uuid) {
            //  AccYCharacteristic = characteristic;
            //}
            //else if (AccZCharacteristicUuid == characteristic.uuid) {
            //  AccZCharacteristic = characteristic;
            //}
          })

          //
          // Check to see if we found all of our characteristics.
          //
          if (AccXCharacteristic) {
            //
            // We did, so bake a pizza!
            //
            getData();
          }
          else {
            console.log('missing characteristics  ', AccXCharacteristic);
          }
        })
      })
    })
  })
})

const getData = () => {
	var times = 1;
	AccXCharacteristic.read(function(error,data){
		if(error){console.log('reading error');}
		else{
			var acc = new Float64Array(3);
			acc[0] = (data[0] == 0)?data[1]:data[1]*(-1);
			acc[1] = (data[2] == 0)?data[3]:data[3]*(-1);
			acc[2] = (data[4] == 0)?data[5]:data[5]*(-1);

			console.log('The result is %d %d %d',acc[0],acc[1],acc[2]);

			acc[0] = acc[0]/100;
			acc[1] = acc[1]/100;

			acc[2] = acc[2]/100;
			console.log('The result is %d %d %d',acc[0],acc[1],acc[2]);
		}
	});
	setTimeout(getData,2000);

// 	AccXCharacteristic.on('read', function(data, isNotification) {
//  	console.log('Our x is ready!');
//	var acc = new Float64Array(3);
//	acc[0] = (data[0] == 0)?data[1]:data[1]*(-1);
//	acc[1] = (data[2] == 0)?data[3]:data[3]*(-1);
//	acc[2] = (data[4] == 0)?data[5]:data[5]*(-1);
//	console.log('The result is %d %d %d',acc[0],acc[1],acc[2]);


//	acc[0] = acc[0]/1000;
//	acc[1] = acc[1]/1000;
//	acc[2] = acc[2]/1000;
 //   console.log('The result is %d %d %d',acc[0],acc[1],acc[2]);
  //});
//console.log('check');
//	AccXCharacteristic.subscribe(function(err) {
//		if(err){console('xxerr');}
//		console.log('subx check');
//		var temperature = new Buffer(3);
//		temperature.writeUInt16BE(450, 0);
//		AccXCharacteristic.write(temperature, false, function(err) {
//			if (err) {
//				console.log('xxx error');
//			}
 //   });
  //});

}
