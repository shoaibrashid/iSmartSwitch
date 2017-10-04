// JavaScript source code
request = require('request');
var url;

var Service, Characteristic;
 

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-mcu-iSmartSwitch", "iSmartSwitch", mySwitch);
}

function mySwitch(log, config) {
    this.log = log;
    this.getUrl = config['getUrl'];
    this.postUrl = config['postUrl'];
    this.name = config["name"];
     
}

mySwitch.prototype = {

    getSwitchOnCharacteristic: function (callback) {
         
        request({
            url: this.getUrl,
            method: 'GET',
        },
            function (error, response, body) {
                var currentState;
                if(body==='true'){
                    currentState=true;
                }else{
                    currentState=false;
                }
                return callback(null, currentState);
            });
    },

    setSwitchOnCharacteristic: function (on, callback) {
        var newState = on ? "true": "false";
        request.get({
            url:  this.postUrl + '?state=' + newState
        }, 
        function(err, response, body) {
            if(err){
                callback(err);
            }else{
                callback(null,on);
            }
        }.bind(this));   
    },
    identify: function (callback) {
        this.log("Identify requested!");
        callback(); // success
    },
    getServices: function () {
        var informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, "Medeveloper")
            .setCharacteristic(Characteristic.Model, "Smart switch")
            .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

        switchService = new Service.Switch("iSmartSwitch");
        switchService
            .getCharacteristic(Characteristic.On)
            .on('get', this.getSwitchOnCharacteristic.bind(this))
            .on('set', this.setSwitchOnCharacteristic.bind(this));

        return [switchService];
    }
};



