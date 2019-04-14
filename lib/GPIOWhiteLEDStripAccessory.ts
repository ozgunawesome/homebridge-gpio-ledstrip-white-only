import { Gpio } from "pigpio";
import { changeBase } from "./Runtime";

var Accessory, Service, Characteristic, uuid;

export default class GPIOWhiteLEDStripAccessory {

  private log;
  private name: string;
  private ledStripSvc;
  private wled: Gpio;

  // Base class methods
  private addService: (any) => any;
  private getService: (any) => any;
  private services: any[];
  private uuid_base: string;

  static init(exportTypes) {
    Accessory = exportTypes.Accessory;
    Service = exportTypes.Service;
    Characteristic = exportTypes.Characteristic;
    uuid = exportTypes.uuid;

    changeBase(GPIOWhiteLEDStripAccessory, Accessory);
  }

  constructor(log, config) {
    var name = config["name"];
    var id = uuid.generate('gpio-ledstrip.white.' + (config['id'] || this.name));
    Accessory.call(this, name, id);
    this.uuid_base = id;
    this.name = name;
    this.log = log;

    this.ledStripSvc = this.addService(Service.Lightbulb);

    var resetState = this.resetState.bind(this);

    this.ledStripSvc.getCharacteristic(Characteristic.On)
      .on('change', resetState);
    this.ledStripSvc.getCharacteristic(Characteristic.Brightness)
      .setValue(100)
      .on('change', resetState);

    this.wled = new Gpio(config["pin"], { mode: Gpio.OUTPUT });

    this.resetState();
  }

  getServices(): any {
    return this.services;
  };

  private resetState() {
    let _b = Math.round(this.brightness() * 255 / 100);

    if (!this.isOn() || _b === 0) {
      this.log("Turning off");
      this.wled.pwmWrite(0);
    } else {
      this.log("Set brightness to " + _b);
      this.wled.pwmWrite(_b);
    }
  };

  private isOn(): boolean {
    return this.ledStripSvc.getCharacteristic(Characteristic.On).value;
  }

  private brightness(): number {
    return this.ledStripSvc.getCharacteristic(Characteristic.Brightness).value;
  }
}
