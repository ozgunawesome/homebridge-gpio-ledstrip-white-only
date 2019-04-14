import GPIOWhiteLEDStripAccessory from "./lib/GPIOWhiteLEDStripAccessory"; 
import {Gpio} from "pigpio"; 

module.exports = function (homebridge) {
  var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

  GPIOWhiteLEDStripAccessory.init(exportTypes);

  homebridge.registerAccessory("homebridge-gpio-ledstrip-white-only", "GPIOWhiteLEDStrip", GPIOWhiteLEDStripAccessory);
};
